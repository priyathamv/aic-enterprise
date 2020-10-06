package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.responses.UserDetailsResponse;
import com.aic.aicenterprise.services.UserService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.aic.aicenterprise.constants.AppConstants.AUTH_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Slf4j
@RestController
@RequestMapping(value = AUTH_PATH)
public class AuthController {

    private UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user-details")
    public UserDetailsResponse getUserDetails(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);

        log.info("Fetching User details from token: {}", token);

        UserDetailsResponse userDetailsResponse;
        UserEntity userEntity = parseToken(token.split(" ")[1]);
        userEntity.setPassword(null);
        try {
            userDetailsResponse = UserDetailsResponse.builder()
                    .payload(userEntity)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while fetching user details from token: {}", ex);
            userDetailsResponse = UserDetailsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching user details from token")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();

        }
        return userDetailsResponse;
    }

    private UserEntity parseToken(String token) {
        DecodedJWT decode = JWT.decode(token);
        String payload = decode.getSubject();
        return userService.findUserByEmail(payload);
    }

}
