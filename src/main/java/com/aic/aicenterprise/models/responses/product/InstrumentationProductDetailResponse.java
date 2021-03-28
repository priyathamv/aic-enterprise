package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstrumentationProductDetailResponse extends BaseResponse<InstrumentationProduct> {

    @Builder
    public InstrumentationProductDetailResponse(int status, String error, String msg, InstrumentationProduct payload) {
        super(status, error, msg, payload);
    }

}
