package com.aic.aicenterprise.services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    @Override
    public boolean sendMail(String toAddress, String subject, String body) throws IOException {
        Email from = new Email("vinnakota4201@gmail.com");
        Email to = new Email(toAddress);
        Content content = new Content("text/html", body);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        log.info("Mail response: {}", response);

        return response.getStatusCode() >= 200 && response.getStatusCode() < 300;
    }

}
