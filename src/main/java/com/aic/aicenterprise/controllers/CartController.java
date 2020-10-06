package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.models.responses.CartResponse;
import com.aic.aicenterprise.services.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.aic.aicenterprise.constants.AppConstants.CART_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = CART_PATH)
public class CartController {

    private CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    @GetMapping(value = "")
    public CartResponse getUserCart(@RequestParam("email") String email) {
        log.info("Getting user {} cart", email);

        CartResponse cartResponse;
        try {
            UserCart userCart = cartService.getUserCart(email);
            cartResponse = CartResponse.builder()
                    .payload(userCart)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching user cart: {}", ex);
            cartResponse = CartResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching user cart")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return cartResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveUserCart(@RequestBody UserCart userCart) {
        log.info("Saving user cart: {}", userCart);

        SaveResponse userCartSaveResponse;
        try {
            boolean saveUserCart = cartService.saveUserCart(userCart);
            userCartSaveResponse = SaveResponse.builder()
                    .payload(saveUserCart)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving user cart: {}", ex);
            userCartSaveResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving user cart")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return userCartSaveResponse;
    }
    
}
