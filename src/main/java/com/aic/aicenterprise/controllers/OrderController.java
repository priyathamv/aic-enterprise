package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.models.SaveResponse;
import com.aic.aicenterprise.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.aic.aicenterprise.constants.AppConstants.ORDERS_PATH;

@Slf4j
@RestController
@RequestMapping(value = ORDERS_PATH)
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = "/place-order")
    public SaveResponse placeOrder(@RequestBody UserCart userCart) {
        log.info("Placing order: {}", userCart);

        SaveResponse orderPlacedResponse;
        try {
            boolean orderPlaceStatus = orderService.placeOrder(userCart);
            orderPlacedResponse = SaveResponse.builder()
                    .payload(orderPlaceStatus)
                    .msg("success")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while placing order: {}", ex);
            orderPlacedResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while placing order")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return orderPlacedResponse;
    }

}
