package com.aic.aicenterprise.services;

import java.io.IOException;

public interface EmailService {
    boolean sendMail(String toAddress, String subject, String body) throws IOException;
}
