package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LifeScienceProductListResponse extends BaseResponse<List<LifeScienceProduct>> {

    @Builder
    public LifeScienceProductListResponse(int status, String error, String msg, List<LifeScienceProduct> payload) {
        super(status, error, msg, payload);
    }

}
