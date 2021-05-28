package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, String> {
}
