package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.entities.ProductDetails;
import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.repositories.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.aic.aicenterprise.constants.AppConstants.APP_DOMAIN;
import static com.aic.aicenterprise.constants.AppConstants.TAMIL_NADU;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private EmailService emailService;
    private UserService userService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService, UserService userService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.userService = userService;
    }


    @Override
    public boolean placeOrder(UserCart userCart) {
        Order order = Order.builder()
                .email(userCart.getEmail())
                .name(userCart.getName())
                .productList(userCart.getCartItems())
                .createTs(new Date())
                .build();

        Order orderSaved = orderRepository.save(order);
        boolean orderStatus = userCart.getEmail().equals(orderSaved.getEmail());

        UserEntity user = userService.findUserByEmail(userCart.getEmail());

        List<String> toAddresses =
                nonNull(user.getAddressList()) &&
                !user.getAddressList().isEmpty() &&
                TAMIL_NADU.equals(user.getAddressList().get(0).getState()) ?
                        Arrays.asList("sales.tn@aicgroup.in", "vinnakotapriyatham@gmail.com") :
                        Arrays.asList("sales@aicgroup.in", "vinnakota4201@gmail.com");

        boolean mailStatus = sendOrderMail(userCart, toAddresses);

        return orderStatus && mailStatus;
    }

    @Override
    public List<Order> getOrderHistory(String email) {
        return orderRepository.findByEmail(email);
    }

    private boolean sendOrderMail(UserCart userCart, List<String> toAddresses) {
        String subject = "Website order query";
        String cartBodyHtml = getCartBodyHtml(userCart);

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

    private String getCartBodyHtml(UserCart userCart) {
        return "<!doctype html>\n" +
                "<html lang=\"en\">\n" +
                "  <head></head>\n" +
                "  <body style='color: black; font-family: sans-serif;'>\n" +
                "    <div style='padding: 50px 15vw;'>\n" +
                "      <div style='margin-bottom: 30px;'>\n" +
                "        <div style='display: inline-block; margin-top: 30px;'>\n" +
                "          <div style='margin-bottom: 10px;'><b>Company Name:&nbsp;</b>" + userCart.getName() + "</div>\n" +
                "          <div><b>Email:&nbsp;</b>" + userCart.getEmail() + "</div>\n" +
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
                            userCart.getCartItems().stream().map(this::getTableRow).collect(Collectors.joining()) +
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
