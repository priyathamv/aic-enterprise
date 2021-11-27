package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.models.requests.common.CareerFormRequest;
import com.aic.aicenterprise.models.responses.CategoriesResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.common.CommonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.aic.aicenterprise.constants.AppConstants.COMMON_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = COMMON_PATH)
public class CommonController {

  private CommonService commonService;

  @Autowired
  public CommonController(CommonService commonService) {
    this.commonService = commonService;
  }

  @PostMapping(value = "/careers")
  public SaveResponse postCareerForm(@ModelAttribute CareerFormRequest careerFormRequest) {
    log.info("Sending career form to email...");

    SaveResponse response;
    try {
      boolean status = commonService.uploadResume(careerFormRequest);
      response = SaveResponse.builder()
          .payload(status)
          .msg(SUCCESS)
          .status(HttpStatus.OK.value())
          .build();

    } catch (Exception ex) {
      log.info("Exception while sending resume to email: {}", ex.getLocalizedMessage());
      response = SaveResponse.builder()
          .error(ex.toString())
          .msg("Exception while sending resume to email")
          .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
          .payload(false)
          .build();
    }
    return response;
  }
}
