package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.entities.ProductDetails;
import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.OrderStatus;
import com.aic.aicenterprise.models.OrderSummary;
import com.aic.aicenterprise.repositories.OrderRepository;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.aic.aicenterprise.constants.AppConstants.APP_DOMAIN;
import static com.aic.aicenterprise.constants.AppConstants.TAMIL_NADU;
import static com.aic.aicenterprise.constants.DBConstants.ID;
import static com.aic.aicenterprise.constants.DBConstants.ORDER_STATUS;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private EmailService emailService;
    private UserService userService;
    private CartService cartService;
    private MongoTemplate mongoTemplate;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService, UserService userService, CartService cartService, MongoTemplate mongoTemplate) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.userService = userService;
        this.cartService = cartService;
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public boolean placeOrder(Order order) {
        order.setCreateTs(new Date());

        Order orderSaved = orderRepository.save(order);
        boolean orderSaveStatus = order.getEmail().equals(orderSaved.getEmail());
        boolean clearCartStatus = cartService.clearUserCart(order.getEmail());

        boolean orderStatus = orderSaveStatus && clearCartStatus;
        log.info("Order Status: {} Clear Cart status: {}", orderSaveStatus, clearCartStatus);

        UserEntity user = userService.findUserByEmail(order.getEmail());

        List<String> toAddresses =
                nonNull(user.getAddressList()) &&
                !user.getAddressList().isEmpty() &&
                TAMIL_NADU.equals(user.getAddressList().get(0).getState()) ?
                        Arrays.asList("sales.tn@aicgroup.in", "vinnakotapriyatham@gmail.com") :
                        Arrays.asList("sales@aicgroup.in", "vinnakota4201@gmail.com");

        boolean mailStatus = sendOrderMail(order, toAddresses);

        return orderStatus && mailStatus;
    }

    @Override
    public List<Order> getOrderHistory(String email) {
        return orderRepository.findByEmail(email);
    }

    @Override
    public boolean updateOrderStatus(String id, OrderStatus orderStatus) {
        Query query = new Query(new Criteria(ID).is(id));
        Update update = new Update().set(ORDER_STATUS, orderStatus);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Order.class);
        return updateResult.getModifiedCount() == 1;
    }

    @Override
    public List<Order> fetchOrdersByStatus(OrderStatus orderStatus, Pageable pageable) {
        return isNull(orderStatus) ?
                orderRepository.findAll(pageable).getContent() :
                orderRepository.findByOrderStatus(orderStatus.toString(), pageable);
    }

    @Override
    public OrderSummary getOrderSummary() {
        List<Order> orderList = orderRepository.findAll();

        long newOrders = orderList.stream()
                .filter(curOrder -> OrderStatus.NEW.equals(curOrder.getOrderStatus()))
                .count();
        long acceptedOrders = orderList.stream()
                .filter(curOrder -> OrderStatus.ACCEPTED.equals(curOrder.getOrderStatus()))
                .count();
        long dispatchedOrders = orderList.stream()
                .filter(curOrder -> OrderStatus.DISPATCHED.equals(curOrder.getOrderStatus()))
                .count();
        long fulfilledOrders = orderList.stream()
                .filter(curOrder -> OrderStatus.FULFILLED.equals(curOrder.getOrderStatus()))
                .count();

        return OrderSummary.builder()
                .pendingOrders(newOrders)
                .acceptedOrders(acceptedOrders)
                .dispatchedOrders(dispatchedOrders)
                .fulfilledOrders(fulfilledOrders)
                .build();
    }

    private boolean sendOrderMail(Order order, List<String> toAddresses) {
        String subject = "Website order query";
        String cartBodyHtml = getCartBodyHtml(order);

        // Send mail
        return toAddresses.stream()
                .allMatch(toAddress -> {
                    try {
                        return emailService.sendMail(toAddress, subject, cartBodyHtml);
                    } catch (IOException e) {
                        log.info("Exception while sending mail: {}", e);
                        return false;
                    }
                });
    }

    private String getCartBodyHtml(Order order) {
        return "<!doctype html>\n" +
                "<html lang=\"en\">\n" +
                "  <head></head>\n" +
                "  <body style='color: black; font-family: sans-serif;'>\n" +
                "    <div style='padding: 50px 15vw;'>\n" +
                "      <div style='margin-bottom: 30px;'>\n" +
                "        <div style='display: inline-block; margin-top: 30px;'>\n" +
                "          <div style='margin-bottom: 10px;'><b>Company Name:&nbsp;</b>" + order.getName() + "</div>\n" +
                "          <div><b>Email:&nbsp;</b>" + order.getEmail() + "</div>\n" +
                "        </div>\n" +
                "        <img style='width: 100px; height: 100px; float: right; margin-bottom: 30px;' src='" + APP_DOMAIN + "/images/aic_logo.png' alt=''/>\n" +
                "      </div>\n" +
                "      <table style='width: 100%; border-collapse: separate; border-spacing: 0 5px;'>\n" +
                "        <thead>\n" +
                "          <tr style='background-color: #232162e6; color: #FFF;'>\n" +
                "            <th style='font-weight: normal; padding: 15px 30px; text-align: left;'>Code</th>\n" +
                "            <th style='font-weight: normal; padding: 15px 30px; text-align: left;'>Name</th>\n" +
                "            <th style='font-weight: normal; padding: 15px 30px; text-align: left;'>Brand</th>\n" +
                "            <th style='font-weight: normal; padding: 15px 30px; text-align: left;'>Quantity</th>\n" +
                "          </tr>\n" +
                "        </thead>\n" +
                "        <tbody>\n" +
                            order.getProductList().stream().map(this::getTableRow).collect(Collectors.joining()) +
                "        </tbody>\n" +
                "      </table>\n" +
                "    </div>\n" +
                "  </body>\n" +
                "</html>\n";
    }

    private String getTableRow(ProductDetails cartItem) {
        return "<tr style='border: 1px solid black;'>\n" +
                    getTableColumn(cartItem.getCode()) +
                    getTableColumn(cartItem.getName()) +
                    getTableColumn(cartItem.getBrand()) +
                    getTableColumn(String.valueOf(cartItem.getQuantity())) +
                "</tr>\n";
    }

    private String getTableColumn(String value) {
        return "<td style='padding: 15px 30px; border-bottom: 1px solid #CCC;'>" +
                    value +
                "</td>\n";
    }

}
