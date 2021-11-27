package com.aic.aicenterprise.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EmailService {
    boolean sendMail(String toAddress, String subject, String body, MultipartFile file) throws IOException;
//    boolean sendMailNormal(String toAddresses, String subject, String body) throws MessagingException;
}
