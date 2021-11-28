package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.models.OrderStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderStatusRequest {
    private Order order;
    private OrderStatus orderStatus;
}
