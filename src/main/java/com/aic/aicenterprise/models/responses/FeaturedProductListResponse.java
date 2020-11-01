package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.FeaturedProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FeaturedProductListResponse extends BaseResponse<List<FeaturedProduct>> {

    @Builder
    public FeaturedProductListResponse(int status, String error, String msg, List<FeaturedProduct> payload) {
        super(status, error, msg, payload);
    }

}
