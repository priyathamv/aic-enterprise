package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.exceptions.EmailNotFoundException;
import com.aic.aicenterprise.exceptions.ResetPasswordLinkExpiredException;
import com.aic.aicenterprise.models.ForgotPasswordRequest;
import com.aic.aicenterprise.models.ResetPasswordRequest;
import com.aic.aicenterprise.repositories.UserRepository;
import com.aic.aicenterprise.services.image.ImageService;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import static com.aic.aicenterprise.constants.DBConstants.*;
import static java.util.Collections.emptyList;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private UserRepository userRepository;
    private MongoTemplate mongoTemplate;
    private EmailService emailService;
    private ImageService imageService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, MongoTemplate mongoTemplate, EmailService emailService, ImageService imageService) {
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
        this.emailService = emailService;
        this.imageService = imageService;
    }


    @Override
    public UserEntity saveUser(UserEntity userEntity) {
        UserEntity userFromDB = userRepository.findByEmail(userEntity.getEmail());

        if (nonNull(userFromDB)) { // User already created an account
            if (nonNull(userFromDB.getPassword())) { // User already created an Email account
                if (nonNull(userEntity.getPassword())) // User trying to create a duplicate Email account
                    return null;
                else { // Merging existing email with new Gmail login
                    userEntity.setPassword(userFromDB.getPassword());
                    userEntity.setPhoneNumber(userFromDB.getPhoneNumber());
                    userEntity.setAddressList(userFromDB.getAddressList());
                    userEntity.setImageUrl(nonNull(userFromDB.getImageUrl()) ?
                            userFromDB.getImageUrl() :
                            userEntity.getImageUrl()
                    );
                }
            } else { // User already created a Gmail account
//                if (nonNull(userEntity.getPassword())) { // Merging existing Gmail with new Email login
                    userEntity.setImageUrl(userFromDB.getImageUrl());
                    userEntity.setPhoneNumber(userFromDB.getPhoneNumber());
                    userEntity.setAddressList(userFromDB.getAddressList());
//                }
            }
        }

        return userRepository.save(userEntity);
    }

    @Override
    public UserEntity findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean forgotPassword(ForgotPasswordRequest request) throws IOException {
        UserEntity userEntity = userRepository.findByEmail(request.getEmail());
        if (isNull(userEntity))
            throw new EmailNotFoundException();

        String resetPasswordToken = UUID.randomUUID().toString();
        Date resetPasswordExpires = new Date(Calendar.getInstance().getTimeInMillis() + (5 * 60000));

        boolean updateStatus = updatePasswordRecovery(request.getEmail(), resetPasswordToken, resetPasswordExpires);
        log.info("Password recovery token update status: {}", updateStatus);

        return emailService.sendMail(
                request.getEmail(),
                "Reset your password",
                getResetPasswordHtml(userEntity.getFirstName(), resetPasswordToken)
        );
    }

    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        UserEntity userEntity = userRepository.findByResetPasswordToken(request.getResetPasswordToken());

        if (nonNull(userEntity)) {
            Date curDateTimestamp = new Date(Calendar.getInstance().getTimeInMillis());
            boolean isLinkExpired = curDateTimestamp.after(userEntity.getResetPasswordExpires());
            if (isLinkExpired)
                throw new ResetPasswordLinkExpiredException();

            return updatePassword(userEntity.getEmail(), request.getPassword());
        }
        return false;
    }

    @Override
    public String uploadUserImage(String email, MultipartFile file) throws IOException {
        String imageUrl = imageService.getImageUrl(file);

        Query query = new Query(new Criteria(EMAIL).is(email));
        Update update = new Update().set(IMAGE_URL, imageUrl);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1 ? imageUrl : null;
    }

    @Override
    public boolean updateUser(UserEntity userEntity) {
        Query query = new Query(new Criteria(EMAIL).is(userEntity.getEmail()));

        Update update = new Update()
                .set(FIRST_NAME, userEntity.getFirstName())
                .set(LAST_NAME, userEntity.getLastName())
                .set(PHONE_NUMBER, userEntity.getPhoneNumber())
                .set(ADDRESS_LIST, userEntity.getAddressList());

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1;
    }

    private String getResetPasswordHtml(String name, String resetPasswordToken) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "  <head></head>\n" +
                "  <body style='color: black; font-family: sans-serif; padding: 50px 15vw; background-color: #FAFAFA'>\n" +
                "    <div style='text-align: center; border: 1px solid #CCC; padding: 50px 0; margin-bottom: 20px; background-color: #FFF;'>\n" +
                "      <div style='margin-bottom: 30px; font-size: 22px;'>Hi " + name + "</div>\n" +
                "      <div style='margin-bottom: 10px;'>You have asked to reset your password.</div>\n" +
                "      <a href='https://aic-enterprises.el.r.appspot.com/reset-password?token=" + resetPasswordToken + "' style='color: #232162;'>Please click this link to enter a new password</a>\n" +
                "      <div style='margin: 30px 0;'>If you didn't request a password change, please ignore this email.</div>\n" +
                "      <div>Thank you!</div>\n" +
                "    </div>\n" +
                "    <div style='text-align: center; color: #848484;'>Please do not reply to this email</div>\n" +
                "  </body>\n" +
                "</html>\n";
    }

    private boolean updatePasswordRecovery(String email, String resetPasswordToken, Date resetPasswordExpires) {
        Query query = new Query(new Criteria(EMAIL).is(email));
        Update update = new Update()
                .set("resetPasswordToken", resetPasswordToken)
                .set("resetPasswordExpires", resetPasswordExpires);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1;
    }

    private boolean updatePassword(String email, String password) {
        Query query = new Query(new Criteria(EMAIL).is(email));
        Update update = new Update().set("password", password);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity applicationUserEntity = userRepository.findByEmail(username);
        if (applicationUserEntity == null) {
            throw new UsernameNotFoundException(username);
        }
        return new org.springframework.security.core.userdetails.User(
                applicationUserEntity.getEmail(),
                applicationUserEntity.getPassword(),
                emptyList()
        );
    }



}
