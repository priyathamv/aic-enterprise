package com.aic.aicenterprise.services.product;

import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductService2<T> {
    List<T> getProductList(String category, String brand, String division, String searchValue, Pageable pageable);

    boolean deleteAllProducts();

    List<String> getAllBrands();

    List<String> getAllCategories();

    List<String> getDivisions(String brand);

    boolean saveProducts(List<T> productList);

    boolean deleteProduct(String code);

    void deleteProductsByBrand(String brand);

    void deleteProductsByCategory(String category);

    void deleteProductsByDivision(String division);

    long getTotalProducts();

    T getProductDetails(String productId);

    T getNextProductDetails(String productId, LocalDateTime updateTs, boolean isNext);

    void deleteProductsByBrandAndCategory(String name, String category);
}
