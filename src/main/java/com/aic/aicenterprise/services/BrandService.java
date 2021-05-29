package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.models.requests.brand.BrandRequest;

import java.util.List;

public interface BrandService {
    List<Brand> fetchBrands();
    boolean generateBrands();
    boolean createBrand(BrandRequest brand);
    boolean deleteBrand(Brand brand);
}
