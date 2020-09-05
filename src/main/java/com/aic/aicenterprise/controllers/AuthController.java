package com.aic.aicenterprise.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.aic.aicenterprise.constants.AppConstants.AUTH_PATH;

@Slf4j
@RestController
@RequestMapping(value = AUTH_PATH)
public class AuthController {

    @GetMapping("/is-token-valid")
    public boolean isTokenValid() {
        return true;
    }

}
