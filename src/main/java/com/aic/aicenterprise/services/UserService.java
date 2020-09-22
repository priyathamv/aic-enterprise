package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.ForgotPasswordRequest;
import com.aic.aicenterprise.models.ResetPasswordRequest;

import javax.mail.MessagingException;

public interface UserService {
    boolean saveUser(UserEntity userEntity);

    UserEntity findUserByEmail(String email);

    boolean forgotPassword(ForgotPasswordRequest request) throws MessagingException;

    boolean resetPassword(ResetPasswordRequest request);
}
