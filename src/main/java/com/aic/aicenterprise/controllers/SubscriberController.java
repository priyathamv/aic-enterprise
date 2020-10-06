package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Subscriber;
import com.aic.aicenterprise.models.responses.SubscriberListResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.SubscriberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.SUBSCRIBERS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = SUBSCRIBERS_PATH)
public class SubscriberController {
    
    private SubscriberService subscriberService;

    @Autowired
    public SubscriberController(SubscriberService subscriberService) {
        this.subscriberService = subscriberService;
    }


    @GetMapping(value = "/all")
    public SubscriberListResponse getAllSubscribers() {
        log.info("Getting all subscribers");

        SubscriberListResponse subscriberListResponse;
        try {
            List<String> subscriberList = subscriberService.getAllSubscribers();
            subscriberListResponse = SubscriberListResponse.builder()
                    .payload(subscriberList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching subscribers: {}", ex);
            subscriberListResponse = SubscriberListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching subscribers")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return subscriberListResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveSubscriber(@RequestBody Subscriber subscriber) {
        log.info("Saving subscriber: {}", subscriber);

        SaveResponse subscriberSaveResponse;
        try {
            boolean saveSubscriber = subscriberService.saveSubscriber(subscriber);
            subscriberSaveResponse = SaveResponse.builder()
                    .payload(saveSubscriber)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving subscriber: {}", ex);
            subscriberSaveResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving subscriber")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return subscriberSaveResponse;
    }
    
}
