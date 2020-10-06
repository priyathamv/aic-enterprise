package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.exceptions.EmailNotFoundException;
import com.aic.aicenterprise.exceptions.ResetPasswordLinkExpiredException;
import com.aic.aicenterprise.models.UserRole;
import com.aic.aicenterprise.models.requests.ForgotPasswordRequest;
import com.aic.aicenterprise.models.requests.ResetPasswordRequest;
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

import static com.aic.aicenterprise.constants.AppConstants.APP_DOMAIN;
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
    public UserEntity signUpEmailUser(UserEntity userEntity) throws IOException {
        userEntity.setConfirmed(false);

        UserEntity userFromDB = saveSignUpUser(userEntity);
        if (isNull(userFromDB)) { // User trying to create a duplicate account
            return null;
        }

        sendEmailConfirmationMail(userEntity.getEmail());
        return userEntity;
    }

    @Override
    public boolean sendEmailConfirmationMail(String email) throws IOException {
        String confirmationToken = UUID.randomUUID().toString();

        // Update DB with the token and send a mail to the user for verification
        updateMailConfirmation(email, false, confirmationToken);

        String confirmEmailLink = APP_DOMAIN + "/confirm-email?email=" + email + "&token=" + confirmationToken;

        return emailService.sendMail(
                email,
                "Welcome to AIC Group! Confirm your email",
                getConfirmEmailHtml(confirmEmailLink)
        );
    }

    private String getConfirmEmailHtml(String confirmEmailLink) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "  <head>\n" +
                "    <style>\n" +
                "      body {\n" +
                "        color: black;\n" +
                "        font-family: sans-serif;\n" +
                "        margin: 0;\n" +
                "        background-color: #FAFAFA;\n" +
                "      }\n" +
                "      .container {\n" +
                "        border-radius: 5px;\n" +
                "        padding: 50px;\n" +
                "        background-color: #FFF;\n" +
                "        margin: 50px 20%;\n" +
                "        text-align: center;\n" +
                "      }\n" +
                "      .heading {\n" +
                "        font-size: 24px;\n" +
                "        margin-bottom: 10px;\n" +
                "      }\n" +
                "      hr {\n" +
                "        color: red;\n" +
                "      }\n" +
                "      .content {\n" +
                "        line-height: 25px;\n" +
                "        margin: 20px 0 25px 0;\n" +
                "      }\n" +
                "      .button-style {\n" +
                "        background-color: #232162;\n" +
                "        color: #FFFFFF !important;\n" +
                "        padding: 12px 25px;\n" +
                "        border: none;\n" +
                "        border-radius: 3px;\n" +
                "        font-size: 14px;\n" +
                "        text-decoration: none;\n" +
                "      }\n" +
                "      .subtext {\n" +
                "        font-size: 12px;\n" +
                "        margin-top: 80px;\n" +
                "      }\n" +
                "      .link {\n" +
                "        font-size: 12px;\n" +
                "      }\n" +
                "    </style>\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <div class='container'>\n" +
                "      <div class='heading'>Welcome to AIC Group</div>\n" +
                "      <hr>\n" +
                "      <div class='content'>\n" +
                "        Congratulations! You're almost set to start using AIC Group.<br />Just click the button below to validate your email address.\n" +
                "      </div>\n" +
                "      <a class='button-style' href='" + confirmEmailLink + "' target='_blank'>Confirm your email address</a>\n" +
                "      <div class='subtext'>\n" +
                "        If the button does not work for any reason, you can also paste the following into your browser:\n" +
                "      </div>\n" +
                "      <a class='link' href='" + confirmEmailLink + "' target='_blank'>" + confirmEmailLink + "</a>\n" +
                "    </div>\n" +
                "  </body>\n" +
                "</html>\n";
    }

    @Override
    public UserEntity saveSignUpUser(UserEntity userEntity) {
        UserEntity userFromDB = userRepository.findByEmail(userEntity.getEmail());

        if (nonNull(userFromDB)) { // User already created an account
            if (nonNull(userFromDB.getPassword())) { // User already created an account using Email
                return userFromDB.isConfirmed() ?
                        null : // Email verified
                        userRepository.save(userEntity); // Email not verified
            } else { // User already created an account using Gmail
                Query query = new Query(new Criteria(EMAIL).is(userEntity.getEmail()));
                Update update = new Update()
                        .set(FIRST_NAME, userEntity.getFirstName())
                        .set(LAST_NAME, userEntity.getLastName())
                        .set(PHONE_NUMBER, userEntity.getPhoneNumber())
                        .set(PASSWORD, userEntity.getPassword());

                UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
                return updateResult.getModifiedCount() == 1 ?
                        userEntity :
                        null;
            }
        } else // User creating a new account for the first time
            return userRepository.save(userEntity);
    }

    @Override
    public UserEntity saveGoogleUser(UserEntity userEntity) {
        UserEntity userFromDB = userRepository.findByEmail(userEntity.getEmail());

        // Pick User image from DB, if null use Gmail image
        String imageUrl = (nonNull(userFromDB) && nonNull(userFromDB.getImageUrl())) ?
                userFromDB.getImageUrl() :
                userEntity.getImageUrl();

        if (isNull(userFromDB)) { // User logging in for the first time using Gmail
            return userRepository.save(userEntity);
        } else {
            Query query = new Query(new Criteria(EMAIL).is(userEntity.getEmail()));
            Update update = new Update()
                    .set(FIRST_NAME, userEntity.getFirstName())
                    .set(LAST_NAME, userEntity.getLastName())
                    .set(IMAGE_URL, imageUrl);
            mongoTemplate.updateFirst(query, update, UserEntity.class);

            userEntity.setImageUrl(imageUrl);
            userEntity.setUserRole(userFromDB.getUserRole());
            userEntity.setPhoneNumber(userFromDB.getPhoneNumber());
            userEntity.setAddressList(userFromDB.getAddressList());
            return userEntity;
        }
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
    public boolean confirmEmail(String email, String token) {
        UserEntity userInDB = userRepository.findByEmail(email);

        // Invalid email
        if (isNull(userInDB))
            return false;

        return userInDB.isConfirmed() || (token.equals(userInDB.getConfirmationToken()) && updateMailConfirmation(email, true, null));
    }

    @Override
    public boolean isEmailConfirmed(String email) {
        UserEntity userFromDB = userRepository.findByEmail(email);
        return nonNull(userFromDB) && userFromDB.isConfirmed();
    }

    private boolean updateMailConfirmation(String email, boolean isConfirmed, String confirmationToken) {
        Query query = new Query(new Criteria(EMAIL).is(email));

        Update update = new Update()
                .set(IS_CONFIRMED, isConfirmed)
                .set(CONFIRMATION_TOKEN, confirmationToken);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1;
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
                "      <a href='" + APP_DOMAIN + "/reset-password?token=" + resetPasswordToken + "' style='color: #232162;'>Please click this link to enter a new password</a>\n" +
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

    @Override
    public boolean updateUserRole(String email, UserRole userRole) {
        Query query = new Query(new Criteria(EMAIL).is(email));
        Update update = new Update().set("userRole", userRole);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);
        return updateResult.getModifiedCount() == 1;
    }

}
