package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Subscriber;
import com.aic.aicenterprise.repositories.SubscriberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SubscriberServiceImpl implements SubscriberService {

    private SubscriberRepository subscriberRepository;

    @Autowired
    public SubscriberServiceImpl(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    @Override
    public List<String> getAllSubscribers() {
        log.info("Fetching all subscribers");
        return subscriberRepository.findAll()
                .stream()
                .map(Subscriber::getEmail)
                .collect(Collectors.toList());
    }

    @Override
    public boolean saveSubscriber(Subscriber subscriber) {
        log.info("Saving subscriber: {}", subscriber);
        Subscriber save = subscriberRepository.save(subscriber);
        return save.getEmail().equals(subscriber.getEmail());
    }
}
