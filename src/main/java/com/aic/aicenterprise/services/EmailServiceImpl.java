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
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

//    private JavaMailSender mailSender;

//    @Autowired
//    public EmailServiceImpl(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }

    @Value(value = "${sendgrid.apikey}")
    private String sendgridApiKey;

    @Override
    public boolean sendMail(String toAddress, String subject, String body) throws IOException {
        Email from = new Email("aic.enterprises9@gmail.com");
        Email to = new Email(toAddress);
        Content content = new Content("text/html", body);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendgridApiKey);
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        log.info("Mail Status: {}, Response: {}", response.getStatusCode(), response.getBody());

        return response.getStatusCode() >= 200 && response.getStatusCode() < 300;
    }

//    @Override
//    public boolean sendMailNormal(String toAddresses, String subject, String body) throws MessagingException {
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
//        mimeMessage.addRecipients(Message.RecipientType.TO, InternetAddress.parse(toAddresses));
//        helper.setText(body, true);
//        helper.setSubject(subject);
//        mailSender.send(mimeMessage);
//        return true;
//    }

}
