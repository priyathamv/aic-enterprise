package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AnalyticalProductListResponse extends BaseResponse<List<AnalyticalProduct>> {

    @Builder
    public AnalyticalProductListResponse(int status, String error, String msg, List<AnalyticalProduct> payload) {
        super(status, error, msg, payload);
    }

}
