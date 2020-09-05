package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.SaveResponse;
import com.aic.aicenterprise.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        log.info("Saving userEntity: {}", userEntity);
        userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));

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

}
