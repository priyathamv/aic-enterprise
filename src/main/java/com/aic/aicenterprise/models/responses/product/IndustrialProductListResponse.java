package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IndustrialProductListResponse extends BaseResponse<List<IndustrialProduct>> {

    @Builder
    public IndustrialProductListResponse(int status, String error, String msg, List<IndustrialProduct> payload) {
        super(status, error, msg, payload);
    }

}
