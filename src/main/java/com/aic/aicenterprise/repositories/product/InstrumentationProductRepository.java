package com.aic.aicenterprise.repositories.product;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstrumentationProductRepository extends PagingAndSortingRepository<InstrumentationProduct, String> {
    Page<InstrumentationProduct> findAll(Pageable pageable);

    List<InstrumentationProduct> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<InstrumentationProduct> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);

    List<InstrumentationProduct> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand,
        String searchValue, Pageable pageable);

    List<InstrumentationProduct> findByBrandIgnoreCaseAndDivisionIgnoreCase(String brand,
        String division, Pageable pageable);

    void deleteByBrand(String brand);

    void deleteByCategory(String category);
}
