package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;

public interface CartService {
    UserCart getUserCart(String email);

    boolean saveUserCart(UserCart userCart);

    boolean clearUserCart(String email);
}
