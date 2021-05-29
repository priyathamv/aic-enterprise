package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Division;
import com.aic.aicenterprise.models.requests.DivisionRequest;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.DivisionsResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.DivisionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.*;

@Slf4j
@RestController
@RequestMapping(value = DIVISION_PATH)
public class DivisionController {

    private DivisionService divisionService;

    @Autowired
    public DivisionController(DivisionService divisionService) {
        this.divisionService = divisionService;
    }

    @GetMapping(value = "")
    public DivisionsResponse getAllDivisions() {
        log.info("Getting all divisions...");
        DivisionsResponse divisionsResponse;
        try {
            List<Division> divisionList = divisionService.fetchDivisions();

            divisionsResponse = DivisionsResponse.builder()
                    .payload(divisionList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching divisions: {}", ex.getLocalizedMessage());
            divisionsResponse = DivisionsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching divisions")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return divisionsResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveDivision(@RequestBody DivisionRequest divisionRequest) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = divisionService.createDivision(divisionRequest);
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving division: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving division")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping("/generate-divisions")
    public SaveResponse generateDivisions() {
        SaveResponse confirmResponse;
        try {
            boolean generateStatus = divisionService.generateDivisions();

            confirmResponse = SaveResponse.builder()
                    .payload(generateStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while generating divisions: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while generating divisions")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping(value = "/delete")
    public SaveResponse deleteDivision(@RequestBody Division division) {
        SaveResponse confirmResponse;
        try {
            boolean deleteStatus = divisionService.deleteDivision(division.getName());

            confirmResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while deleting division: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting division")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping(value = "/count")
    public CountResponse getSummary() {
        log.info("Getting divisions count");

        CountResponse countResponse;
        try {
            long totalDivisions = divisionService.fetchDivisions().size();
            countResponse = CountResponse.builder()
                    .payload(totalDivisions)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching divisions count: {}", ex.getLocalizedMessage());
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching divisions count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }

}
