package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.repositories.UserCartRepository;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;

import static com.aic.aicenterprise.constants.DBConstants.CART_ITEMS;
import static com.aic.aicenterprise.constants.DBConstants.EMAIL;

@Slf4j
@Service
public class CartServiceImpl implements CartService {

    private UserCartRepository userCartRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public CartServiceImpl(UserCartRepository userCartRepository, MongoTemplate mongoTemplate) {
        this.userCartRepository = userCartRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public UserCart getUserCart(String email) {
        log.info("Fetching user cart by email: {}", email);
        return userCartRepository.findByEmail(email);
    }

    @Override
    public boolean saveUserCart(UserCart userCart) {
        log.info("Fetching user cart: {}", userCart);
        UserCart save = userCartRepository.save(userCart);
        return userCart.getEmail().equals(save.getEmail());
    }

    @Override
    public boolean clearUserCart(String email) {
        Query query = new Query(new Criteria(EMAIL).is(email));
        Update update = new Update().set(CART_ITEMS, Collections.emptyList());

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, UserCart.class);

        return updateResult.getModifiedCount() == 1;
    }

}
