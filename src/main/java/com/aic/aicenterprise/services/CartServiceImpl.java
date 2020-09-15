package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.models.SaveResponse;
import com.aic.aicenterprise.repositories.UserCartRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;

@Slf4j
@Service
public class CartServiceImpl implements CartService {

    private UserCartRepository userCartRepository;
    private EmailService emailService;

    @Autowired
    public CartServiceImpl(UserCartRepository userCartRepository, EmailService emailService) {
        this.userCartRepository = userCartRepository;
        this.emailService = emailService;

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

    @Override
    public boolean placeOrder(UserCart userCart) throws MessagingException {
        String subject = "Website order query";
        String toAddress = "vinnakota4201@gmail.com,ananthvy@tractionmonkey.com";

        // Send mail
        return emailService.sendMail(toAddress, subject, userCart);
    }

}
