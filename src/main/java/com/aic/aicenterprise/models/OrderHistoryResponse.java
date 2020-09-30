package com.aic.aicenterprise.models;

import com.aic.aicenterprise.entities.Order;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderHistoryResponse extends BaseResponse<List<Order>> {

    @Builder
    public OrderHistoryResponse(int status, String error, String msg, List<Order> payload) {
        super(status, error, msg, payload);
    }

}
