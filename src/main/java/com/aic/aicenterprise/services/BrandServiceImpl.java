package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.repositories.BrandRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.util.Objects.nonNull;

@Slf4j
@Service
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;
    private ProductService productService;

    @Autowired
    public BrandServiceImpl(BrandRepository brandRepository, ProductService productService) {
        this.brandRepository = brandRepository;
        this.productService = productService;
    }


    @Override
    public List<Brand> fetchBrands() {
        log.info("Fetching all brands...");

        return StreamSupport.stream(brandRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public boolean generateBrandsFromProducts() {
        List<Brand> allBrandNames = productService.getAllBrands()
                .stream()
                .filter(curBrand -> nonNull(curBrand) && !curBrand.isEmpty())
                .map(curBrandName -> new Brand(curBrandName, curBrandName))
                .collect(Collectors.toList());
        log.info("Total no of unique brands in products table: {}", allBrandNames.size());

        brandRepository.saveAll(allBrandNames);
        return true;
    }

    @Override
    public boolean createBrand(Brand brand) {
        log.info("Creating brand: {}", brand);

        Brand savedBrand = brandRepository.save(brand);
        return brand.getName().equals(savedBrand.getName());
    }

    @Override
    @Transactional
    public boolean deleteBrand(String brand) {
        log.info("Deleting brand: {}", brand);

        brandRepository.deleteById(brand);
        productService.deleteProductsByBrand(brand);
        return true;
    }
}
