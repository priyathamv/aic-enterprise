package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import org.springframework.data.domain.Pageable;

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
}
