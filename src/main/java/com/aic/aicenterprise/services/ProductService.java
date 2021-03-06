package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.entities.Product;
import com.aic.aicenterprise.models.requests.ProductEnquiryRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

// TODO: Deprecated
public interface ProductService {
    List<Product> getProductList(String brand, String division, String searchValue, Pageable pageable);

    boolean loadFromExcel() throws IOException;

    boolean deleteAllProducts();

    List<String> getAllBrands();

    List<String> getDivisions(String brand);

    boolean productEnquiry(ProductEnquiryRequest request);

    boolean saveProducts(List<Product> productList);

    boolean deleteProduct(String code);

    void deleteProductsByBrand(Brand brand);

    long getTotalProducts();

    List<String> uploadImages(List<MultipartFile> file) throws IOException;
}
