package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderListResponse extends BaseResponse<List<Order>> {

    @Builder
    public OrderListResponse(int status, String error, String msg, List<Order> payload) {
        super(status, error, msg, payload);
    }

}
