package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.models.OrderStatus;
import com.aic.aicenterprise.models.requests.OrderStatusRequest;
import com.aic.aicenterprise.models.responses.OrderListResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public SaveResponse placeOrder(@RequestBody Order order) {
        log.info("Placing order: {}", order);

        SaveResponse orderPlacedResponse;
        try {
            boolean orderPlaceStatus = orderService.placeOrder(order);
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
    public OrderListResponse ordersHistory(@RequestParam String email) {
        log.info("Fetching Users order history: {}", email);

        OrderListResponse orderListResponse;
        try {
            List<Order> orderHistory = orderService.getOrderHistory(email);
            orderListResponse = OrderListResponse.builder()
                    .payload(orderHistory)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching order history: {}", ex);
            orderListResponse = OrderListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching order history")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(Collections.emptyList())
                    .build();
        }
        return orderListResponse;
    }

    @GetMapping("/all")
    public OrderListResponse getOrdersByStatus(
            @RequestParam(value = "orderStatus", required = false) OrderStatus orderStatus,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Fetching orders by status: {}", orderStatus);

        OrderListResponse orderListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);
            List<Order> orderList = orderService.fetchOrdersByStatus(orderStatus, pageable);
            orderListResponse = OrderListResponse.builder()
                    .payload(orderList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching orders by status: {}", ex);
            orderListResponse = OrderListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching orders by status")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return orderListResponse;
    }

    @PostMapping("/update-status")
    public SaveResponse updateOrderStatus(@RequestBody OrderStatusRequest request) {
        log.info("Updating order status: {}", request);

        SaveResponse orderStatusResponse;
        try {
            boolean orderStatus = orderService.updateOrderStatus(request.getId(), request.getOrderStatus());
            orderStatusResponse = SaveResponse.builder()
                    .payload(orderStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while updating order status: {}", ex);
            orderStatusResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while updating order status")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return orderStatusResponse;
    }

}
