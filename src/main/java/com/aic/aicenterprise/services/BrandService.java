package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;

import java.util.List;

public interface BrandService {
    List<Brand> fetchBrands();
    boolean generateBrandsFromProducts();
    boolean createBrand(Brand brand);
    boolean deleteBrand(String brand);
}
