package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LifeScienceProductDetailResponse extends BaseResponse<LifeScienceProduct> {

    @Builder
    public LifeScienceProductDetailResponse(int status, String error, String msg, LifeScienceProduct payload) {
        super(status, error, msg, payload);
    }

}
