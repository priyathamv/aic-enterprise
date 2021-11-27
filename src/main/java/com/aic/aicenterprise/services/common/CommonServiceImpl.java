package com.aic.aicenterprise.services.common;

import com.aic.aicenterprise.models.requests.common.CareerFormRequest;
import com.aic.aicenterprise.models.requests.common.ContactUsRequest;
import com.aic.aicenterprise.services.EmailService;
import com.sendgrid.helpers.mail.objects.Attachments;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class CommonServiceImpl implements CommonService {

  private EmailService emailService;

  @Autowired
  public CommonServiceImpl(EmailService emailService) {
    this.emailService = emailService;
  }

  @Override
  public boolean uploadResume(CareerFormRequest careerForm) throws IOException {
    String careerFormHtml = buildCareerFormHtml(careerForm);

    return emailService.sendMail("aic.enterprises9@gmail.com", "Careers enquiry", careerFormHtml, careerForm.getResume());
  }

  @SneakyThrows
  @Override
  public boolean sendContactUsMail(ContactUsRequest contactUsRequest) {
    String contactUsFormHtml = buildContactUsFormHtml(contactUsRequest);

    return emailService.sendMail("aic.enterprises9@gmail.com", "Enquiry", contactUsFormHtml, null);
  }

  private String buildContactUsFormHtml(ContactUsRequest contactUsRequest) {
    return "<!doctype html>\n" +
        "<html lang=\"en\">\n" +
        "  <head>\n" +
        "    <style>\n" +
        "      body {\n" +
        "        color: black;\n" +
        "        font-family: sans-serif;\n" +
        "        margin: 0;\n" +
        "        background-color: #FAFAFA;\n" +
        "        margin: auto 40%;\n" +
        "      }\n" +
        "      .styled-table {\n" +
        "        border-collapse: collapse;\n" +
        "        margin: 25px 0;\n" +
        "        font-size: 0.9em;\n" +
        "        font-family: sans-serif;\n" +
        "        min-width: 400px;\n" +
        "        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n" +
        "      }\n" +
        "      .styled-table th,\n" +
        "      .styled-table td {\n" +
        "          padding: 12px 15px;\n" +
        "      }\n" +
        "      .styled-table tbody tr {\n" +
        "        border-bottom: 1px solid #dddddd;\n" +
        "      }\n" +
        "\n" +
        "      .styled-table tbody tr:nth-of-type(even) {\n" +
        "          background-color: #f3f3f3;\n" +
        "      }\n" +
        "    </style>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <table class=\"styled-table\">\n" +
        "        <tbody>\n" +
        "            <tr>\n" +
        "                <td>Name</td>\n" +
        "                <td>" + contactUsRequest.getName() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Phone number</td>\n" +
        "                <td>" + contactUsRequest.getPhoneNumber() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Email</td>\n" +
        "                <td>" + contactUsRequest.getEmail() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Company</td>\n" +
        "                <td>" + contactUsRequest.getCompanyName() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>CAS number of product</td>\n" +
        "                <td>" + contactUsRequest.getCasNumber() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Product description</td>\n" +
        "                <td>" + contactUsRequest.getProductDescription() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Address</td>\n" +
        "                <td>" + contactUsRequest.getAddress() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Çity</td>\n" +
        "                <td>" + contactUsRequest.getCity() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Zip</td>\n" +
        "                <td>" + contactUsRequest.getZip() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>State</td>\n" +
        "                <td>" + contactUsRequest.getState() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Country</td>\n" +
        "                <td>" + contactUsRequest.getCountry() + "</td>\n" +
        "            </tr>\n" +
        "        </tbody>\n" +
        "    </table>\n" +
        "  </body>\n" +
        "</html>\n";
  }

  private String buildCareerFormHtml(CareerFormRequest careerForm) {
    return "<!doctype html>\n" +
        "<html lang=\"en\">\n" +
        "  <head>\n" +
        "    <style>\n" +
        "      body {\n" +
        "        color: black;\n" +
        "        font-family: sans-serif;\n" +
        "        margin: 0;\n" +
        "        background-color: #FAFAFA;\n" +
        "        margin: auto 40%;\n" +
        "      }\n" +
        "      .styled-table {\n" +
        "        border-collapse: collapse;\n" +
        "        margin: 25px 0;\n" +
        "        font-size: 0.9em;\n" +
        "        font-family: sans-serif;\n" +
        "        min-width: 400px;\n" +
        "        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);\n" +
        "      }\n" +
        "      .styled-table th,\n" +
        "      .styled-table td {\n" +
        "          padding: 12px 15px;\n" +
        "      }\n" +
        "      .styled-table tbody tr {\n" +
        "        border-bottom: 1px solid #dddddd;\n" +
        "      }\n" +
        "\n" +
        "      .styled-table tbody tr:nth-of-type(even) {\n" +
        "          background-color: #f3f3f3;\n" +
        "      }\n" +
        "    </style>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <table class=\"styled-table\">\n" +
        "        <tbody>\n" +
        "            <tr>\n" +
        "                <td>Name</td>\n" +
        "                <td>" + careerForm.getFirstName() + " " + careerForm.getLastName() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Email</td>\n" +
        "                <td>" + careerForm.getEmail() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Mobile number</td>\n" +
        "                <td>" + careerForm.getMobileNumber() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Work Experience</td>\n" +
        "                <td>" + careerForm.getWorkExperience() + "</td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td>Current Designation</td>\n" +
        "                <td>" + careerForm.getCurrentDesignation() + "</td>\n" +
        "            </tr>\n" +
        "            <tr class=\"active-row\">\n" +
        "                <td>Applying for</td>\n" +
        "                <td>" + careerForm.getApplyingFor() + "</td>\n" +
        "            </tr>\n" +
        "        </tbody>\n" +
        "    </table>\n" +
        "  </body>\n" +
        "</html>\n";
  }

}