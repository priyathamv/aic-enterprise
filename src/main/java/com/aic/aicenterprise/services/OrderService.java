package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.models.OrderStatus;
import com.aic.aicenterprise.models.OrderSummary;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    boolean placeOrder(Order order);

    List<Order> getOrderHistory(String email);

    boolean updateOrderStatus(String id, OrderStatus orderStatus);

    List<Order> fetchOrdersByStatus(OrderStatus orderStatus, Pageable pageable);

    OrderSummary getOrderSummary();
}
