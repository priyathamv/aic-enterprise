package com.aic.aicenterprise.repositories.product;

import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LifeScienceProductRepository extends PagingAndSortingRepository<LifeScienceProduct, String> {
    Page<LifeScienceProduct> findAll(Pageable pageable);

    List<LifeScienceProduct> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<LifeScienceProduct> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);

    List<LifeScienceProduct> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand,
        String searchValue, Pageable pageable);

    List<LifeScienceProduct> findByBrandIgnoreCaseAndDivisionIgnoreCase(String brand,
        String division, Pageable pageable);

    void deleteByBrand(String brand);

    void deleteByCategory(String category);

    void deleteByBrandAndCategory(String brand, String category);

    void deleteByDivision(String division);
}
