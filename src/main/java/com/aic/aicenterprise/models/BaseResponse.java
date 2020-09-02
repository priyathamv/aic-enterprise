package com.aic.aicenterprise.models;

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