package com.aic.aicenterprise.models.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageUrlResponse extends BaseResponse<String> {
    @Builder
    public ImageUrlResponse(int status, String error, String msg, String payload) {
        super(status, error, msg, payload);
    }
}
