package com.aic.aicenterprise.models.requests.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContactUsRequest {
  private String name;
  private String phoneNumber;
  private String email;
  private String workExperience;
  private String companyName;
  private String casNumber;
  private String productDescription;
  private String address;
  private String city;
  private String zip;
  private String state;
  private String country;
}
