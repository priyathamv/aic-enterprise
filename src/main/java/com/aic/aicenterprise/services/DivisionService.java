package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Category;
import com.aic.aicenterprise.entities.Division;

import java.util.List;

public interface DivisionService {
    List<Division> fetchDivisions();
    boolean generateDivisions();
    boolean createDivision(Division division);
    boolean deleteDivision(String division);
}
