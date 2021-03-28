package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndustrialProductDetailResponse extends BaseResponse<IndustrialProduct> {

    @Builder
    public IndustrialProductDetailResponse(int status, String error, String msg, IndustrialProduct payload) {
        super(status, error, msg, payload);
    }

}
