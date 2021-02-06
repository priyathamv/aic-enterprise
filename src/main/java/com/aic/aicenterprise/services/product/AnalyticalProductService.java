package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AnalyticalProductService {
    List<AnalyticalProduct> getProductList(String brand, String division, String searchValue, Pageable pageable);

    boolean deleteAllProducts();

    List<String> getAllBrands();

    List<String> getDivisions(String brand);

    boolean saveProducts(List<AnalyticalProduct> productList);

    boolean deleteProduct(String code);

    void deleteProductsByBrand(String brand);

    long getTotalProducts();

    AnalyticalProduct getProductDetails(String productId);
}
