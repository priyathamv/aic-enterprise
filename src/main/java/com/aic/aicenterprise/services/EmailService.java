package com.aic.aicenterprise.services;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {
//    boolean sendMail(String toAddress, String subject, String body) throws IOException;
    boolean sendMailNormal(String toAddresses, String subject, String body) throws MessagingException;
}
