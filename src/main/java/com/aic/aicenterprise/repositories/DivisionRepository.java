package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.Division;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DivisionRepository extends PagingAndSortingRepository<Division, String> {
}
