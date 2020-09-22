package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.exceptions.EmailNotFoundException;
import com.aic.aicenterprise.exceptions.ResetPasswordLinkExpiredException;
import com.aic.aicenterprise.models.ForgotPasswordRequest;
import com.aic.aicenterprise.models.ResetPasswordRequest;
import com.aic.aicenterprise.models.SaveResponse;
import com.aic.aicenterprise.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static com.aic.aicenterprise.constants.AppConstants.USER_PATH;

@Slf4j
@RestController
@RequestMapping(value = USER_PATH)
public class UserController {

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserService userService;

    @Autowired
    public UserController(BCryptPasswordEncoder bCryptPasswordEncoder, UserService userService) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userService = userService;
    }

    @PostMapping(value = "/sign-up")
    public SaveResponse userSignUp(@RequestBody UserEntity userEntity) {
        // Encrypting password
        userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));
        log.info("Saving userEntity: {}", userEntity);

        SaveResponse userSaveResponse;
        try {
            boolean saveUser = userService.saveUser(userEntity);
            userSaveResponse = SaveResponse.builder()
                    .payload(saveUser)
                    .msg(saveUser ? "success" : "User already exists")
                    .status(saveUser ? HttpStatus.OK.value() : HttpStatus.CONFLICT.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving userEntity: {}", ex);
            userSaveResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving userEntity")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return userSaveResponse;
    }

    @PostMapping(value = "/save")
    public SaveResponse saveUser(@RequestBody UserEntity userEntity) {
        log.info("Saving userEntity: {}", userEntity);

        SaveResponse userSaveResponse;
        try {
            boolean saveUser = userService.saveUser(userEntity);
            userSaveResponse = SaveResponse.builder()
                    .payload(saveUser)
                    .msg(saveUser ? "success" : "User already exists")
                    .status(saveUser ? HttpStatus.OK.value() : HttpStatus.CONFLICT.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving userEntity: {}", ex);
            userSaveResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving userEntity")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return userSaveResponse;
    }

    @PostMapping("/forgot-password")
    public SaveResponse forgotPassword(@RequestBody ForgotPasswordRequest request) {
        SaveResponse passwordResetResponse;
        try {
            boolean forgotPasswordStatus = userService.forgotPassword(request);
            passwordResetResponse = SaveResponse.builder()
                    .payload(forgotPasswordStatus)
                    .msg("success")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (EmailNotFoundException ex) {
            log.info("Exception while resetting user password: {}", ex);
            passwordResetResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Email not registered")
                    .status(HttpStatus.NO_CONTENT.value())
                    .payload(false)
                    .build();
        } catch (Exception ex) {
            log.info("Exception while handling forgot password: {}", ex);
            passwordResetResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while handling forgot password")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return passwordResetResponse;
    }

    @PostMapping("/reset-password")
    public SaveResponse resetPassword(@RequestBody ResetPasswordRequest request) {
        SaveResponse passwordResetResponse;
        try {
            // Encrypting password
            request.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

            boolean resetStatus = userService.resetPassword(request);
            passwordResetResponse = SaveResponse.builder()
                    .payload(resetStatus)
                    .msg("success")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (ResetPasswordLinkExpiredException ex) {
            log.info("Reset password link expired: {}", ex);
            passwordResetResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Reset password link expired")
                    .status(HttpStatus.GONE.value())
                    .payload(false)
                    .build();
        } catch (Exception ex) {
            log.info("Exception while resetting user password: {}", ex);
            passwordResetResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while resetting user password")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return passwordResetResponse;
    }

}
