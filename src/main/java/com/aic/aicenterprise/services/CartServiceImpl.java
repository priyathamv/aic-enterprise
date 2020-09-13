package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.repositories.UserCartRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CartServiceImpl implements CartService {

    private UserCartRepository userCartRepository;

    @Autowired
    public CartServiceImpl(UserCartRepository userCartRepository) {
        this.userCartRepository = userCartRepository;
    }

    @Override
    public UserCart getUserCart(String email) {
        log.info("Fetching user cart by email: {}", email);
        return userCartRepository.findByEmail(email);
    }

    @Override
    public boolean saveUserCart(UserCart userCart) {
        log.info("Fetching user cart: {}", userCart);
        UserCart save = userCartRepository.save(userCart);
        return userCart.getEmail().equals(save.getEmail());
    }
}
