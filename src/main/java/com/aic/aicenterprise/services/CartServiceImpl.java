package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserCart;
import com.aic.aicenterprise.entities.UserProduct;
import com.aic.aicenterprise.entities.product.*;
import com.aic.aicenterprise.repositories.UserCartRepository;
import com.mongodb.client.result.UpdateResult;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

  @SneakyThrows
  @Override
  public UserCart getUserCart(String email) {
    log.info("Fetching user cart by email: {}", email);
    UserCart userCart = userCartRepository.findByEmail(email);

    Map<String, Integer> productIdToQuantityMap = userCart.getCartItems().stream()
        .collect(Collectors.toMap(UserProduct::getProductId, UserProduct::getQuantity));


    Query query = new Query();
    Criteria criteria = Criteria.where("productId").in(productIdToQuantityMap.keySet());
    query.addCriteria(criteria);

    CompletableFuture<List<AnalyticalProduct>> analyticalProductsFuture = CompletableFuture.supplyAsync(() -> {
      log.info("1111");
      return mongoTemplate.find(query, AnalyticalProduct.class);
    });
    CompletableFuture<List<IndustrialProduct>> industrialProductsFuture = CompletableFuture.supplyAsync(() -> {
      log.info("2222");
      return mongoTemplate.find(query, IndustrialProduct.class);
    });
    CompletableFuture<List<InstrumentationProduct>> instrumentationProductsFuture = CompletableFuture.supplyAsync(() -> {
      log.info("3333");
      return mongoTemplate.find(query, InstrumentationProduct.class);
    });
    CompletableFuture<List<LifeScienceProduct>> lifeScienceProductsFuture = CompletableFuture.supplyAsync(() -> {
      log.info("4444");
      return mongoTemplate.find(query, LifeScienceProduct.class);
    });

    CompletableFuture.allOf(analyticalProductsFuture, industrialProductsFuture, instrumentationProductsFuture, lifeScienceProductsFuture).get();

    List<UserProduct> analyticalProducts = analyticalProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(
            lifeScienceProduct,
            productIdToQuantityMap.getOrDefault(lifeScienceProduct.getProductId(), 1))
        ).collect(Collectors.toList());

    List<UserProduct> industrialProducts = industrialProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(
            lifeScienceProduct,
            productIdToQuantityMap.getOrDefault(lifeScienceProduct.getProductId(), 1))
        ).collect(Collectors.toList());

    List<UserProduct> instrumentationProducts = instrumentationProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(
            lifeScienceProduct,
            productIdToQuantityMap.getOrDefault(lifeScienceProduct.getProductId(), 1))
        ).collect(Collectors.toList());

    List<UserProduct> lifeScienceProducts = lifeScienceProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(
            lifeScienceProduct,
            productIdToQuantityMap.getOrDefault(lifeScienceProduct.getProductId(), 1))
        ).collect(Collectors.toList());

    List<UserProduct> allCartProducts = Stream.of(
        analyticalProducts,
        industrialProducts,
        instrumentationProducts,
        lifeScienceProducts
    ).flatMap(Collection::stream).collect(Collectors.toList());

    UserCart updatedUserCart = new UserCart();
    updatedUserCart.setCartItems(allCartProducts);
    updatedUserCart.setName(userCart.getName());
    updatedUserCart.setEmail(userCart.getEmail());
    return updatedUserCart;
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

  private UserProduct convertToUserProduct(ProductBase product, int quantity) {
    UserProduct userProduct = new UserProduct();
    userProduct.setProductId(product.getProductId());
    userProduct.setApplication(product.getApplication());
    userProduct.setCategory(product.getCategory());
    userProduct.setDivision(product.getDivision());
    userProduct.setBrand(product.getBrand());
    userProduct.setName(product.getName());
    userProduct.setImageUrls(product.getImageUrls());

    userProduct.setQuantity(quantity);
    return userProduct;
  }
}
