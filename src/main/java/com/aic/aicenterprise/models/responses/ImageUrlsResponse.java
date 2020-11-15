package com.aic.aicenterprise.models.responses;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ImageUrlsResponse extends BaseResponse<List<String>> {
    @Builder
    public ImageUrlsResponse(int status, String error, String msg, List<String> payload) {
        super(status, error, msg, payload);
    }
}
