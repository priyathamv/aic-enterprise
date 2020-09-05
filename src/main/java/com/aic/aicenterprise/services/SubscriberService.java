package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Subscriber;

import java.util.List;

public interface SubscriberService {
    List<String> getAllSubscribers();
    boolean saveSubscriber(Subscriber email);
}
