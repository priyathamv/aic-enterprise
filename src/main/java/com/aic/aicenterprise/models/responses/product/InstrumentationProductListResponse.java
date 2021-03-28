package com.aic.aicenterprise.models.responses.product;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.models.responses.BaseResponse;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InstrumentationProductListResponse extends BaseResponse<List<InstrumentationProduct>> {

    @Builder
    public InstrumentationProductListResponse(int status, String error, String msg, List<InstrumentationProduct> payload) {
        super(status, error, msg, payload);
    }

}
