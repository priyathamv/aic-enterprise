package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.models.OrderHistoryResponse;
import com.aic.aicenterprise.models.SaveResponse;
import com.aic.aicenterprise.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.ORDERS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

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
                    .msg(SUCCESS)
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

    @GetMapping(value = "")
    public OrderHistoryResponse ordersHistory(@RequestParam String email) {
        log.info("Fetching Users order history: {}", email);

        OrderHistoryResponse orderHistoryResponse;
        try {
            List<Order> orderHistory = orderService.getOrderHistory(email);
            orderHistoryResponse = OrderHistoryResponse.builder()
                    .payload(orderHistory)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching order history: {}", ex);
            orderHistoryResponse = OrderHistoryResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching order history")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(Collections.emptyList())
                    .build();
        }
        return orderHistoryResponse;
    }

}
