package com.aic.aicenterprise.models.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BaseResponse<T> {
    private int status;
    private String error;
    private String msg;
    private T payload;
}