package com.aic.aicenterprise.models.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    private String password;
    private String resetPasswordToken;
}
