package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.ForgotPasswordRequest;
import com.aic.aicenterprise.models.ResetPasswordRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    UserEntity signUpUser(UserEntity userEntity) throws IOException;

    UserEntity saveUser(UserEntity userEntity);

    boolean updateUser(UserEntity userEntity);

    UserEntity findUserByEmail(String email);

    boolean forgotPassword(ForgotPasswordRequest request) throws IOException;

    boolean resetPassword(ResetPasswordRequest request);

    String uploadUserImage(String email, MultipartFile file) throws IOException;

    boolean confirmEmail(String email, String token);

    boolean sendEmailConfirmationMail(String email) throws IOException;

    boolean isEmailConfirmed(String email);
}
