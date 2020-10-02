package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Order;
import com.aic.aicenterprise.entities.ProductDetails;
import com.aic.aicenterprise.entities.UserCart;
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

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private EmailService emailService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
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

        boolean mailStatus = sendOrderMail(userCart);

        return orderStatus && mailStatus;
    }

    @Override
    public List<Order> getOrderHistory(String email) {
        return orderRepository.findByEmail(email);
    }

    private boolean sendOrderMail(UserCart userCart) {
        String subject = "Website order query";
        List<String> toAddresses = Arrays.asList("vinnakotapriyatham@gmail.com", "ananthvy@tractionmonkey.com");
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
