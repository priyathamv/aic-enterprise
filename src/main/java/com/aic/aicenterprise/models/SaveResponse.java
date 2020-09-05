package com.aic.aicenterprise.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveResponse extends BaseResponse<Boolean> {

    @Builder
    public SaveResponse(int status, String error, String msg, Boolean payload) {
        super(status, error, msg, payload);
    }

}
