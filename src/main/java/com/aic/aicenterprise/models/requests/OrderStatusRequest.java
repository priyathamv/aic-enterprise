package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.models.OrderStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderStatusRequest {
    private String id;
    private OrderStatus orderStatus;
}
