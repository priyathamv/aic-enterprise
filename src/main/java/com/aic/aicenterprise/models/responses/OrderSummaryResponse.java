package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.models.OrderSummary;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderSummaryResponse extends BaseResponse<OrderSummary> {

    @Builder
    public OrderSummaryResponse(int status, String error, String msg, OrderSummary payload) {
        super(status, error, msg, payload);
    }

}
