package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.FeaturedProduct;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FeaturedProductService {
    List<FeaturedProduct> getFeaturedProductList(Pageable pageable);

    boolean saveFeaturedProducts(List<FeaturedProduct> productList);

    boolean deleteFeaturedProduct(String code);
}
