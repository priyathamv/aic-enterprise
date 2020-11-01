package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.FeaturedProduct;
import com.aic.aicenterprise.repositories.FeaturedProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class FeaturedProductServiceImpl implements FeaturedProductService {

    private FeaturedProductRepository featuredProductRepository;

    @Autowired
    public FeaturedProductServiceImpl(FeaturedProductRepository featuredProductRepository) {
        this.featuredProductRepository = featuredProductRepository;
    }

    @Override
    public List<FeaturedProduct> getFeaturedProductList(Pageable pageable) {
        log.info("Fetching featured products");
        return featuredProductRepository.findAll(pageable).getContent();
    }

    @Override
    public boolean saveFeaturedProducts(List<FeaturedProduct> productList) {
        featuredProductRepository.saveAll(productList);
        return true;
    }

    @Override
    public boolean deleteFeaturedProduct(String code) {
        log.info("Deleting featured product: {}", code);

        featuredProductRepository.deleteById(code);
        return true;
    }

}
