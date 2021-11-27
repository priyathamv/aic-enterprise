package com.aic.aicenterprise.services.common;

import com.aic.aicenterprise.models.requests.common.CareerFormRequest;
import com.aic.aicenterprise.models.requests.common.ContactUsRequest;

import java.io.IOException;

public interface CommonService {
  boolean uploadResume(CareerFormRequest careerForm) throws IOException;

  boolean sendContactUsMail(ContactUsRequest contactUsRequest);
}
