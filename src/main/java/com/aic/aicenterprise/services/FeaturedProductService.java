package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.FeaturedProduct;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface FeaturedProductService {
    List<FeaturedProduct> getFeaturedProductList(Pageable pageable);

    List<FeaturedProduct> getCovid19ProductList(Pageable pageable);

    boolean saveFeaturedProducts(List<FeaturedProduct> productList);

    boolean deleteFeaturedProduct(String code);

    boolean loadFromExcel() throws IOException;

    boolean deleteAllProducts();

    List<FeaturedProduct> getFilteredProductList(String brand, String searchValue, Pageable pageable);
}
