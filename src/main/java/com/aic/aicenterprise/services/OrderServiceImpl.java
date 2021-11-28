package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.entities.UserProduct;
import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.OrderStatus;
import com.aic.aicenterprise.models.OrderSummary;
import com.aic.aicenterprise.models.requests.OrderStatusRequest;
import com.aic.aicenterprise.repositories.OrderRepository;
import com.mongodb.client.result.UpdateResult;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.aic.aicenterprise.constants.AppConstants.APP_DOMAIN;
import static com.aic.aicenterprise.constants.AppConstants.TAMIL_NADU;
import static com.aic.aicenterprise.constants.DBConstants.*;
import static com.aic.aicenterprise.models.OrderStatus.ACCEPTED;
import static com.aic.aicenterprise.models.OrderStatus.DISPATCHED;
import static com.aic.aicenterprise.models.OrderStatus.FULFILLED;
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


    @SneakyThrows
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

//        boolean mailStatus = sendOrderMail(order, toAddresses);

        String content = "        Thank you for placing your order with us. Our backend team will get\n" +
                         "        in touch with you shortly with all the details of your order.<br></br>\n" +
                         "        Please note that our product's price keeps changing regularly so it\n" +
                         "        would be great if you can share the payment for the product at the\n" +
                         "        earliest.\n";

        // sending confirmation mail to customer
        emailService.sendMail(
            order.getEmail(),
            "Order #" + order.getId() + " confirmed",
            buildOrderWithStatusHtml(order, user, "Thank you", content),
            null);

        emailService.sendMail(
            "aic.enterprises9@gmail.com",
            "Order #" + order.getId() + " alert",
            buildOrderAlertHtml(order, user),
            null);

        return orderStatus;
    }

    private String buildOrderAlertHtml(Order order, UserEntity userEntity) {
        return "<!doctype html>\n" +
            "<html lang=\"en\">\n" +
            "  <head>\n" +
            "    <style>\n" +
            "      body {\n" +
            "        color: black;\n" +
            "        font-family: sans-serif;\n" +
            "        margin: 0;\n" +
            "        background-color: #FAFAFA;\n" +
            "        width: 700px;\n" +
            "      }\n" +
            "      .logo {\n" +
            "        width: 150px;\n" +
            "        height: 150px;\n" +
            "        padding: 30px;\n" +
            "      }\n" +
            "      .company-wrapper {\n" +
            "        display: inline-block;\n" +
            "        background-color: #232162;\n" +
            "        color: #FFF;\n" +
            "        padding: 30px 50px;\n" +
            "        vertical-align: top;\n" +
            "      }\n" +
            "      .company-name {\n" +
            "        font-weight: 100;\n" +
            "        margin-bottom: 20px;\n" +
            "        font-size: 20px;\n" +
            "      }\n" +
            "      .styled-table {\n" +
            "        margin: 20px 30px;\n" +
            "        border-collapse: collapse;\n" +
            "        font-size: 0.9em;\n" +
            "        font-family: sans-serif;\n" +
            "        width: 640px;\n" +
            "        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n" +
            "      }\n" +
            "      .styled-table th,\n" +
            "      .styled-table td {\n" +
            "          padding: 12px 15px;\n" +
            "      }\n" +
            "      .styled-table tbody tr {\n" +
            "        border-bottom: 1px solid #dddddd;\n" +
            "      }\n" +
            "\n" +
            "      .styled-table tbody tr:nth-of-type(even) {\n" +
            "          background-color: #f3f3f3;\n" +
            "      }\n" +
            "    </style>\n" +
            "  </head>\n" +
            "  <body>\n" +
            "    <div>\n" +
            "      <img class='logo' src='https://aicgroup.co.in/images/aic_logo.png' alt='AIC logo'/>\n" +
            "      <div class='company-wrapper'>\n" +
            "        <div class='company-name'>AIC Enterprises Private Limited, BLR</div>\n" +
            "        <div class='company-name'>AIC International, Pondicherry</div>\n" +
            "        <div class='company-name'>AIC Specialities, Chennai</div>\n" +
            "      </div>\n" +
            "      <div style='font-size: 32px; margin-left: 250px; color: #232162; font-weight: 100;'>Order alert</div>\n" +
            "      <div style='padding: 10px 30px;'>\n" +
            "        <b>Customer name</b> " + userEntity.getFirstName() + " " + userEntity.getLastName() + "<br>\n" +
            "        <b>Phone</b>&nbsp;" + userEntity.getPhoneNumber() + "<br>\n" +
            "        <b>Address</b>&nbsp;" + userEntity.getAddressList().get(0).getStreet() + "<br>\n" +
            "        <b>City</b>&nbsp;" + userEntity.getAddressList().get(0).getCity() + "<br>\n" +
            "        <b>State</b>&nbsp;" + userEntity.getAddressList().get(0).getState() + "<br>\n" +
            "        <b>Country</b>&nbsp;" + userEntity.getAddressList().get(0).getCountry() + "<br>\n" +
            "        <b>Pincode</b>&nbsp;" + userEntity.getAddressList().get(0).getZip() + "<br>\n" +
            "      </div>\n" +
            "      <hr style='margin: 20px 30px;'>\n" +
            "      <div style='margin: 20px 30px;'>\n" +
            "        <div style='display: inline-block'>Order Id</div>\n" +
            "        <div style='display: inline-block'>#123456</div>\n" +
            "      </div>\n" +
            "      <hr style='margin: 20px 30px;'>\n" +
            "      <table class=\"styled-table\">\n" +
            "\n" +
            "          <tbody>\n" +
            "              <tr style='font-weight: bold;'>\n" +
            "                  <td>Catalog #</td>\n" +
            "                  <td>Product Name</td>\n" +
            "                  <td>Brand</td>\n" +
            "                  <td>Quantity</td>\n" +
            "              </tr>\n" +
                           order.getProductList().stream().map(this::buildOrderRowHtml).collect(Collectors.joining()) +
            "          </tbody>\n" +
            "      </table>\n" +
            "      <div style='margin: 20px 30px;'>Thank you<br>AIC Group</div>\n" +
            "    </div>\n" +
            "  </body>\n" +
            "</html>\n";
    }

    private String buildOrderWithStatusHtml(Order order, UserEntity user, String heading, String content) {
        return "<!doctype html>\n" +
            "<html lang=\"en\">\n" +
            "  <head>\n" +
            "    <style>\n" +
            "      body {\n" +
            "        color: black;\n" +
            "        font-family: sans-serif;\n" +
            "        margin: 0;\n" +
            "        background-color: #FAFAFA;\n" +
            "        width: 700px;\n" +
            "      }\n" +
            "      .logo {\n" +
            "        width: 150px;\n" +
            "        height: 150px;\n" +
            "        padding: 30px;\n" +
            "      }\n" +
            "      .company-wrapper {\n" +
            "        display: inline-block;\n" +
            "        background-color: #232162;\n" +
            "        color: #FFF;\n" +
            "        padding: 30px 50px;\n" +
            "        vertical-align: top;\n" +
            "      }\n" +
            "      .company-name {\n" +
            "        font-weight: 100;\n" +
            "        margin-bottom: 20px;\n" +
            "        font-size: 20px;\n" +
            "      }\n" +
            "      .styled-table {\n" +
            "        margin: 20px 30px;\n" +
            "        border-collapse: collapse;\n" +
            "        font-size: 0.9em;\n" +
            "        font-family: sans-serif;\n" +
            "        width: 640px;\n" +
            "        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n" +
            "      }\n" +
            "      .styled-table th,\n" +
            "      .styled-table td {\n" +
            "          padding: 12px 15px;\n" +
            "      }\n" +
            "      .styled-table tbody tr {\n" +
            "        border-bottom: 1px solid #dddddd;\n" +
            "      }\n" +
            "\n" +
            "      .styled-table tbody tr:nth-of-type(even) {\n" +
            "          background-color: #f3f3f3;\n" +
            "      }\n" +
            "    </style>\n" +
            "  </head>\n" +
            "  <body>\n" +
            "    <div>\n" +
            "      <img class='logo' src='https://aicgroup.co.in/images/aic_logo.png' alt='AIC logo'/>\n" +
            "      <div class='company-wrapper'>\n" +
            "        <div class='company-name'>AIC Enterprises Private Limited, BLR</div>\n" +
            "        <div class='company-name'>AIC International, Pondicherry</div>\n" +
            "        <div class='company-name'>AIC Specialities, Chennai</div>\n" +
            "      </div>\n" +
            "      <div style='font-size: 32px; margin-left: 250px; color: #232162; font-weight: 100;'>" + heading + "</div>\n" +
            "      <div style='padding: 10px 30px;'>\n" +
            "        Hi " + user.getFirstName() + " " + user.getLastName() + ",<br></br>\n" +
                     content +
            "      </div>\n" +
            "      <hr style='margin: 20px 30px;'>\n" +
            "      <div style='margin: 20px 30px;'>\n" +
            "        <div style='display: inline-block'>Order Id</div>\n" +
            "        <div style='display: inline-block'>#123456</div>\n" +
            "      </div>\n" +
            "      <hr style='margin: 20px 30px;'>\n" +
            "      <table class=\"styled-table\">\n" +
            "\n" +
            "          <tbody>\n" +
            "              <tr style='font-weight: bold;'>\n" +
            "                  <td>Catalog #</td>\n" +
            "                  <td>Product Name</td>\n" +
            "                  <td>Brand</td>\n" +
            "                  <td>Quantity</td>\n" +
            "              </tr>\n" +
                            order.getProductList().stream().map(this::buildOrderRowHtml).collect(Collectors.joining()) +
            "          </tbody>\n" +
            "      </table>\n" +
            "      <div style='margin: 20px 30px;'>Thank you<br>AIC Group</div>\n" +
            "    </div>\n" +
            "  </body>\n" +
            "</html>\n";
    }

    private String buildOrderRowHtml(UserProduct userProduct) {
        return "<tr>\n" +
            "    <td>" + userProduct.getProductId() + "</td>\n" +
            "    <td>" + userProduct.getName() + "</td>\n" +
            "    <td>" + userProduct.getBrand() + "</td>\n" +
            "    <td>" + userProduct.getQuantity() + "</td>\n" +
            "</tr>";
    }

    @Override
    public List<Order> getOrderHistory(String email) {
        return orderRepository.findByEmail(email);
    }

    @SneakyThrows
    @Override
    public boolean updateOrderStatus(OrderStatusRequest orderStatusRequest) {
        String id = orderStatusRequest.getOrder().getId();
        String userEmail = orderStatusRequest.getOrder().getEmail();
        OrderStatus orderStatus = orderStatusRequest.getOrderStatus();

        UserEntity user = userService.findUserByEmail(userEmail);

        Query query = new Query(new Criteria(ID).is(id));

        String statusColumn = ACCEPTED.equals(orderStatus) ? ACCEPTED_TS :
                DISPATCHED.equals(orderStatus) ? DISPATCHED_TS :
                FULFILLED.equals(orderStatus) ? FULFILLED_TS : ACCEPTED_TS;

        Update update = new Update()
                .set(ORDER_STATUS, orderStatus)
                .set(statusColumn, new Date());

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Order.class);

        String orderAcceptedContent = "Your order has been accepted by AIC Group. We will get in touch with you as soon as possible to close in on the quotation of the order and delivery schedule.";
        String orderDispatchedContent = "Thank you for making the payment with us. Your order has been dispatched. Please note that there might be delays in the delivery by 2 - 3 days in view of COVID 19.";
        String orderFulfilledContent = "Thank you for ordering with us! Hope your experience on our platform was one to remember. Please order with us again. We are looking forward to serving you again.";

        if (ACCEPTED.equals(orderStatus))
            emailService.sendMail(
                userEmail,
                "Order Accepted",
                buildOrderWithStatusHtml(orderStatusRequest.getOrder(), user, "Order Accepted", orderAcceptedContent),
                null);
        else if (DISPATCHED.equals(orderStatus))
            emailService.sendMail(
                userEmail,
                "Order Dispatched",
                buildOrderWithStatusHtml(orderStatusRequest.getOrder(), user, "Order Dispatched", orderDispatchedContent),
                null);
        else if (FULFILLED.equals(orderStatus))
            emailService.sendMail(
                userEmail,
                "Order Fulfilled",
                buildOrderWithStatusHtml(orderStatusRequest.getOrder(), user, "Order Fulfilled", orderFulfilledContent),
                null);

        return updateResult.getModifiedCount() == 1;
    }

    private String buildOrderAcceptedHtml(OrderStatusRequest orderStatusRequest) {
        return null;
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
                .filter(curOrder -> ACCEPTED.equals(curOrder.getOrderStatus()))
                .count();
        long dispatchedOrders = orderList.stream()
                .filter(curOrder -> OrderStatus.DISPATCHED.equals(curOrder.getOrderStatus()))
                .count();
        long fulfilledOrders = orderList.stream()
                .filter(curOrder -> FULFILLED.equals(curOrder.getOrderStatus()))
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
                        return emailService.sendMail(toAddress, subject, cartBodyHtml, null);
                    } catch (IOException e) {
                        log.info("Exception while sending mail: {}", e.getLocalizedMessage());
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
                "        <img style='width: 100px; height: 100px; float: right; margin-bottom: 30px;' src='" + APP_DOMAIN + "/images/aic_logo.png' alt='AIC logo'/>\n" +
                "      </div>\n" +
                "      <table style='width: 100%; border-collapse: separate; border-spacing: 0 5px;'>\n" +
                "        <thead>\n" +
                "          <tr style='background-color: #232162e6; color: #FFF;'>\n" +
                "            <th style='font-weight: normal; padding: 15px 30px; text-align: left;'>Product Id</th>\n" +
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

    private String getTableRow(UserProduct cartItem) {
        return "<tr style='border: 1px solid black;'>\n" +
                    getTableColumn(cartItem.getProductId()) +
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
