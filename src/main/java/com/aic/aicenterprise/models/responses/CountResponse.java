package com.aic.aicenterprise.models.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CountResponse extends BaseResponse<Long> {

    @Builder
    public CountResponse(int status, String error, String msg, Long payload) {
        super(status, error, msg, payload);
    }

}
