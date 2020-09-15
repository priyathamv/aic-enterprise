package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.models.SaveResponse;

import javax.mail.MessagingException;

public interface CartService {
    UserCart getUserCart(String email);

    boolean saveUserCart(UserCart userCart);

    boolean placeOrder(UserCart userCart) throws MessagingException;
}
