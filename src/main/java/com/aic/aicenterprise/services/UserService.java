package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.UserMini;
import com.aic.aicenterprise.models.UserRole;
import com.aic.aicenterprise.models.requests.ForgotPasswordRequest;
import com.aic.aicenterprise.models.requests.ResetPasswordRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    UserEntity signUpEmailUser(UserEntity userEntity) throws IOException;

    UserEntity saveSignUpUser(UserEntity userEntity);

    UserEntity saveGoogleUser(UserEntity userEntity);

    boolean updateUser(UserEntity userEntity);

    UserEntity findUserByEmail(String email);

    boolean forgotPassword(ForgotPasswordRequest request) throws IOException;

    boolean resetPassword(ResetPasswordRequest request);

    String uploadUserImage(String email, MultipartFile file) throws IOException;

    boolean confirmEmail(String email, String token);

    boolean sendEmailConfirmationMail(String email) throws IOException;

    boolean isEmailConfirmed(String email);

    boolean updateUserRole(String email, UserRole userRole);

    List<UserMini> getUserList(Pageable pageable);
}
