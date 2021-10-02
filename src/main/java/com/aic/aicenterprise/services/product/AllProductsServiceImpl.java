package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.UserProduct;
import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.repositories.product.AnalyticalProductRepository;
import com.aic.aicenterprise.repositories.product.IndustrialProductRepository;
import com.aic.aicenterprise.repositories.product.InstrumentationProductRepository;
import com.aic.aicenterprise.repositories.product.LifeScienceProductRepository;
import com.aic.aicenterprise.services.CartServiceImpl;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.aic.aicenterprise.services.CartServiceImpl.convertToUserProduct;


@Slf4j
@Service
public class AllProductsServiceImpl implements AllProductsService {

  private AnalyticalProductRepository analyticalProductRepository;
  private IndustrialProductRepository industrialProductRepository;
  private InstrumentationProductRepository instrumentationProductRepository;
  private LifeScienceProductRepository lifeScienceProductRepository;
  private MongoTemplate mongoTemplate;

  @Autowired
  public AllProductsServiceImpl(AnalyticalProductRepository analyticalProductRepository, IndustrialProductRepository industrialProductRepository, InstrumentationProductRepository instrumentationProductRepository, LifeScienceProductRepository lifeScienceProductRepository, MongoTemplate mongoTemplate) {
    this.analyticalProductRepository = analyticalProductRepository;
    this.industrialProductRepository = industrialProductRepository;
    this.instrumentationProductRepository = instrumentationProductRepository;
    this.lifeScienceProductRepository = lifeScienceProductRepository;
    this.mongoTemplate = mongoTemplate;
  }


  @SneakyThrows
  @Override
  public List<UserProduct> fetchProductsByRibbon(String ribbon, Integer pageNo, Integer limit) {
    Pageable pageable = PageRequest.of(pageNo, limit);

    CompletableFuture<List<AnalyticalProduct>> analyticalProductsFuture =
        CompletableFuture.supplyAsync(() -> analyticalProductRepository.findByRibbon(ribbon, pageable));

    CompletableFuture<List<IndustrialProduct>> industrialProductsFuture =
        CompletableFuture.supplyAsync(() -> industrialProductRepository.findByRibbon(ribbon, pageable));

    CompletableFuture<List<InstrumentationProduct>> instrumentationProductsFuture =
        CompletableFuture.supplyAsync(() -> instrumentationProductRepository.findByRibbon(ribbon, pageable));

    CompletableFuture<List<LifeScienceProduct>> lifeScienceProductsFuture =
        CompletableFuture.supplyAsync(() -> lifeScienceProductRepository.findByRibbon(ribbon, pageable));

    CompletableFuture.allOf(analyticalProductsFuture, industrialProductsFuture, instrumentationProductsFuture, lifeScienceProductsFuture).get();

    List<UserProduct> analyticalProducts = analyticalProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(lifeScienceProduct,1))
        .collect(Collectors.toList());

    List<UserProduct> industrialProducts = industrialProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(lifeScienceProduct, 1))
        .collect(Collectors.toList());

    List<UserProduct> instrumentationProducts = instrumentationProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(lifeScienceProduct, 1))
        .collect(Collectors.toList());

    List<UserProduct> lifeScienceProducts = lifeScienceProductsFuture.get().stream()
        .map(lifeScienceProduct -> convertToUserProduct(lifeScienceProduct,  1))
        .collect(Collectors.toList());

    return Stream.of(
        analyticalProducts,
        industrialProducts,
        instrumentationProducts,
        lifeScienceProducts
    ).flatMap(Collection::stream)
        .sorted(Comparator.comparing(UserProduct::getUpdateTs).reversed())
        .limit(limit)
        .collect(Collectors.toList());
  }
}
