package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.UserProduct;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FeaturedProductListResponse extends BaseResponse<List<UserProduct>> {

    @Builder
    public FeaturedProductListResponse(int status, String error, String msg, List<UserProduct> payload) {
        super(status, error, msg, payload);
    }

}
