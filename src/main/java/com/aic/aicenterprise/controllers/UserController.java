package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.exceptions.EmailNotFoundException;
import com.aic.aicenterprise.exceptions.ResetPasswordLinkExpiredException;
import com.aic.aicenterprise.models.*;
import com.aic.aicenterprise.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;
import static com.aic.aicenterprise.constants.AppConstants.USER_PATH;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

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
    public UserDetailsResponse userSignUp(@RequestBody UserEntity userEntity) {
        // Encrypting password
        userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));
        log.info("Saving userEntity: {}", userEntity);

        UserDetailsResponse userSaveResponse;
        try {
            UserEntity savedUser = userService.signUpUser(userEntity);
            userSaveResponse = UserDetailsResponse.builder()
                    .payload(savedUser)
                    .msg(nonNull(savedUser) ? SUCCESS : "User already exists")
                    .status(nonNull(savedUser) ? HttpStatus.OK.value() : HttpStatus.CONFLICT.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving userEntity: {}", ex);
            userSaveResponse = UserDetailsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving userEntity")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return userSaveResponse;
    }

    @PostMapping(value = "/save")
    public UserDetailsResponse saveUser(@RequestBody UserEntity userEntity) {
        log.info("Saving userEntity: {}", userEntity);

        UserDetailsResponse userSaveResponse;
        try {
            UserEntity savedUser = userService.saveUser(userEntity);
            userSaveResponse = UserDetailsResponse.builder()
                    .payload(savedUser)
                    .msg(nonNull(savedUser) ? SUCCESS : "User already exists")
                    .status(nonNull(savedUser) ? HttpStatus.OK.value() : HttpStatus.CONFLICT.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving user: {}", ex);
            userSaveResponse = UserDetailsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving user")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return userSaveResponse;
    }

    @PostMapping(value = "/update")
    public SaveResponse updateUser(@RequestBody UserEntity userEntity) {
        log.info("Updating userEntity: {}", userEntity);

        SaveResponse userUpdateResponse;
        try {
            boolean updateUser = userService.updateUser(userEntity);
            userUpdateResponse = SaveResponse.builder()
                    .payload(updateUser)
                    .msg(updateUser ? SUCCESS : "failed")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while updating user: {}", ex);
            userUpdateResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while updating user")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return userUpdateResponse;
    }

    @PostMapping("/forgot-password")
    public SaveResponse forgotPassword(@RequestBody ForgotPasswordRequest request) {
        SaveResponse passwordResetResponse;
        try {
            boolean forgotPasswordStatus = userService.forgotPassword(request);
            passwordResetResponse = SaveResponse.builder()
                    .payload(forgotPasswordStatus)
                    .msg(SUCCESS)
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
                    .msg(SUCCESS)
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

    @PostMapping("/user-image")
    public ImageUrlResponse uplodUserImage(@RequestParam("file") MultipartFile file, @RequestParam("email") String email) {
        ImageUrlResponse userImageResponse;
        try {
            String imageUrl = userService.uploadUserImage(email, file);
            userImageResponse = ImageUrlResponse.builder()
                    .payload(imageUrl)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while uploading user image: {}", ex);
            userImageResponse = ImageUrlResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while uploading user image")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return userImageResponse;
    }

    @PostMapping("/confirm-email")
    public SaveResponse confirmEmail(@RequestBody ConfirmEmailRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean confirmStatus = userService.confirmEmail(request.getEmail(), request.getToken());
            confirmResponse = SaveResponse.builder()
                    .payload(confirmStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while confirming user email: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while confirming user email")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/send-confirm-email")
    public SaveResponse sendConfirmEmail(@RequestBody ConfirmEmailRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean mailStatus = userService.sendEmailConfirmationMail(request.getEmail());
            confirmResponse = SaveResponse.builder()
                    .payload(mailStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while confirming user email: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while confirming user email")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping("/is-valid-email")
    public SaveResponse isValidEmail(@RequestParam("email") String email) {
        SaveResponse confirmResponse;
        try {
            UserEntity userByEmail = userService.findUserByEmail(email);
            confirmResponse = SaveResponse.builder()
                    .payload(nonNull(userByEmail) ? userByEmail.isConfirmed() : null)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while checking if email already exists: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while checking if email already exists")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

}
