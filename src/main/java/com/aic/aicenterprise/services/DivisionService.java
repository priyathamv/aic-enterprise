package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Category;
import com.aic.aicenterprise.entities.Division;
import com.aic.aicenterprise.models.requests.DivisionRequest;

import java.util.List;

public interface DivisionService {
    List<Division> fetchDivisions();
    boolean generateDivisions();
    boolean createDivision(DivisionRequest divisionRequest);
    boolean deleteDivision(String division);
}
