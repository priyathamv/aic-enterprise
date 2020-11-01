package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, String> {
    Page<Product> findAll(Pageable pageable);

    List<Product> findByBrandIgnoreCase(String brand, Pageable pageable);

    List<Product> findByNameLikeIgnoreCase(String searchValue, Pageable pageable);

    List<Product> findByBrandIgnoreCaseAndNameLikeIgnoreCase(String brand, String searchValue, Pageable pageable);

    List<Product> findByBrandIgnoreCaseAndDivisionIgnoreCase(String brand, String division, Pageable pageable);

    void deleteByBrand(String brand);
}
