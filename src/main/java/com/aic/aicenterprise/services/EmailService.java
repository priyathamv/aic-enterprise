package com.aic.aicenterprise.services;

public interface EmailService {
    void sendMail(String to, String subject, String body);
}
