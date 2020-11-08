package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByEmail(String email);

    List<Order> findByOrderStatus(String orderStatus, Pageable pageable);
}
