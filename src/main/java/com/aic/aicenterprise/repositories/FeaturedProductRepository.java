package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.FeaturedProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Deprecated
public interface FeaturedProductRepository extends PagingAndSortingRepository<FeaturedProduct, String> {
    Page<FeaturedProduct> findAll(Pageable pageable);

    List<FeaturedProduct> findByIsFeaturedFalse(Pageable pageable);

    List<FeaturedProduct> findByIsFeaturedTrue(Pageable pageable);

    List<FeaturedProduct> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand, String searchValue, Pageable pageable);

    List<FeaturedProduct> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<FeaturedProduct> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);
}
