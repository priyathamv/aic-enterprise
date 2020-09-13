package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.UserCart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCartRepository extends MongoRepository<UserCart, String> {
    UserCart findByEmail(String email);
}
