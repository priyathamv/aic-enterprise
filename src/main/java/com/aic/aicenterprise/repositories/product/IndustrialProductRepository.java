package com.aic.aicenterprise.repositories.product;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndustrialProductRepository extends PagingAndSortingRepository<IndustrialProduct, String> {
    Page<IndustrialProduct> findAll(Pageable pageable);

    List<IndustrialProduct> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<IndustrialProduct> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);

    List<IndustrialProduct> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand,
        String searchValue, Pageable pageable);

    List<IndustrialProduct> findByBrandIgnoreCaseAndDivisionIgnoreCase(String brand,
        String division, Pageable pageable);

    void deleteByBrand(String brand);

    void deleteByCategory(String category);

    void deleteByBrandAndCategory(String brand, String category);

    void deleteByDivision(String division);

    List<IndustrialProduct> findByRibbon(String ribbon, Pageable pageable);
}
