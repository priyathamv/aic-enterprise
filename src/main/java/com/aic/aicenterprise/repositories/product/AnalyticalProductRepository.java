package com.aic.aicenterprise.repositories.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyticalProductRepository extends PagingAndSortingRepository<AnalyticalProduct, String> {
    Page<AnalyticalProduct> findAll(Pageable pageable);

    List<AnalyticalProduct> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<AnalyticalProduct> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);

    List<AnalyticalProduct> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand, String searchValue, Pageable pageable);

    List<AnalyticalProduct> findByBrandIgnoreCaseAndDivisionIgnoreCase(String brand, String division, Pageable pageable);

    void deleteByBrand(String brand);

    void deleteByCategory(String category);
}
