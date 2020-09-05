package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.Subscriber;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriberRepository extends MongoRepository<Subscriber, String> {
    List<Subscriber> findAll();
}
