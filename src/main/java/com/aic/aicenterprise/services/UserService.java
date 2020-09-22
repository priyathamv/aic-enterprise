package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.ForgotPasswordRequest;
import com.aic.aicenterprise.models.ResetPasswordRequest;

import javax.mail.MessagingException;
import java.io.IOException;

public interface UserService {
    boolean saveUser(UserEntity userEntity);

    UserEntity findUserByEmail(String email);

    boolean forgotPassword(ForgotPasswordRequest request) throws IOException;

    boolean resetPassword(ResetPasswordRequest request);
}
