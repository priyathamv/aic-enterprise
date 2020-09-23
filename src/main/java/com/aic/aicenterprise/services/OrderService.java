package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;

public interface OrderService {
    boolean placeOrder(UserCart userCart);
}
