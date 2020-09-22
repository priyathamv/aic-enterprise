package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;

import java.io.IOException;

public interface CartService {
    UserCart getUserCart(String email);

    boolean saveUserCart(UserCart userCart);

    boolean placeOrder(UserCart userCart);
}
