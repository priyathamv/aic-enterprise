package com.aic.aicenterprise.models.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmEmailRequest {
    private String email;
    private String token;
}
