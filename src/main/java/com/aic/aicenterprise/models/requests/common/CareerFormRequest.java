package com.aic.aicenterprise.models.requests.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CareerFormRequest {
  private String firstName;
  private String lastName;
  private String email;
  private String mobileNumber;
  private String workExperience;
  private String currentDesignation;
  private String applyingFor;
  private MultipartFile resume;
}
