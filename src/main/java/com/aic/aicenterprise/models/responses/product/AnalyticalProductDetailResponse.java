package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnalyticalProductDetailResponse extends BaseResponse<AnalyticalProduct> {

    @Builder
    public AnalyticalProductDetailResponse(int status, String error, String msg, AnalyticalProduct payload) {
        super(status, error, msg, payload);
    }

}
