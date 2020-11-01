package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.FeaturedProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FeaturedProductRepository extends PagingAndSortingRepository<FeaturedProduct, String> {
    Page<FeaturedProduct> findAll(Pageable pageable);
}
