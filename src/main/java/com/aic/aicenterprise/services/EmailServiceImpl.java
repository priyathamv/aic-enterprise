package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.CartItem;
import com.aic.aicenterprise.entities.UserCart;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.stream.Collectors;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    private JavaMailSender emailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public boolean sendMail(String toAddresses, String subject, UserCart userCart) throws MessagingException {


        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        mimeMessage.addRecipients(Message.RecipientType.TO, InternetAddress.parse(toAddresses));
        helper.setText(getOrderMailBody(userCart), true);
        helper.setSubject(subject);
        emailSender.send(mimeMessage);
        return true;
    }

    private String getOrderMailBody(UserCart userCart) {
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
                "        <img style='width: 100px; height: 100px; float: right; margin-bottom: 30px;' src='https://aic-enterprises.el.r.appspot.com/images/aic_logo.png' alt=''/>\n" +
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

    private String getTableRow(CartItem cartItem) {
        return "<tr style='border: 1px solid black;'>\n" +
                    getTableColumn(cartItem.getCode()) +
                    getTableColumn(cartItem.getName()) +
                    getTableColumn(cartItem.getBrand()) +
                    getTableColumn(String.valueOf(cartItem.getQuantity())) +
                "</tr>\n";
    }

    private String getTableColumn(String value) {
        return "<td style='padding: 15px 30px; border-bottom: 1px solid #CCC;'>" + value + "</td>\n";
    }

}
