package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;

import javax.mail.MessagingException;

public interface EmailService {
    boolean sendMail(String toAddress, String subject, UserCart userCart) throws MessagingException;
}
