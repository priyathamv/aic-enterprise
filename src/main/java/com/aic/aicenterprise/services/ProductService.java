package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Product;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    List<Product> getAllProductsByBrand(String brand);

    boolean loadFromExcel() throws IOException;

    boolean deleteAllProducts();

    List<String> getAllBrands();
}
