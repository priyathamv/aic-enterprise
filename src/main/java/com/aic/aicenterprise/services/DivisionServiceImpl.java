package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Division;
import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.models.requests.DivisionRequest;
import com.aic.aicenterprise.repositories.DivisionRepository;
import com.aic.aicenterprise.services.product.ProductService2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
public class DivisionServiceImpl implements DivisionService {

    private DivisionRepository divisionRepository;
    private ProductService2<AnalyticalProduct> analyticalProductService;
    private ProductService2<IndustrialProduct> industrialProductService;
    private ProductService2<InstrumentationProduct> instrumentationProductService;
    private ProductService2<LifeScienceProduct> lifeScienceProductService;

    @Autowired
    public DivisionServiceImpl(
        DivisionRepository divisionRepository,
        ProductService2<AnalyticalProduct> analyticalProductService,
        ProductService2<IndustrialProduct> industrialProductService,
        ProductService2<InstrumentationProduct> instrumentationProductService,
        ProductService2<LifeScienceProduct> lifeScienceProductService) {
        this.divisionRepository = divisionRepository;
        this.analyticalProductService = analyticalProductService;
        this.industrialProductService = industrialProductService;
        this.instrumentationProductService = instrumentationProductService;
        this.lifeScienceProductService = lifeScienceProductService;
    }


    @Override
    public List<Division> fetchDivisions() {
        log.info("Fetching all divisions...");

        return StreamSupport.stream(divisionRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public boolean generateDivisions() {
        List<String> divisionNames = Arrays.asList(
            "Beakers",
            "Bottles",
            "Burettes Class - A",
            "Burettes Class - B",
            "Columns",
            "Condensers",
            "Cylinders Class - A",
            "Cylinders Class - B",
            "Desiccators",
            "Dishes",
            "Dissolution Flasks",
            "Distilling Apparatus",
            "Extractors",
            "Filtration Assembly",
            "Flask Join Others",
            "Flasks Plain",
            "Funnels",
            "Jars",
            "LHS",
            "LabQuest",
            "Others",
            "Petroleum Jar",
            "Pipettes - Class A",
            "Pipettes - Class B",
            "Quartzware",
            "TestTubes",
            "Tubes",
            "Vials",
            "Volumetric Flasks - Class A",
            "Volumetric Flasks - Class B");

        List<Division> allDivisions = divisionNames.stream()
            .map(curDivisionName -> Division.builder()
                .name(curDivisionName)
                .application("Analytical")
                .category("Laboratory Glassware")
                .brand("")
                .description("")
                .build())
            .collect(Collectors.toList());

        log.info("Total no of unique divisions in products table: {}", allDivisions.size());

        divisionRepository.saveAll(allDivisions);
        return true;
    }

    @Override
    public boolean createDivision(DivisionRequest divisionRequest) {
        log.info("Creating division: {}", divisionRequest);

        divisionRequest.getDivisionNames().stream()
            .map(curDivisionName -> Division.builder()
                .name(curDivisionName)
                .description(divisionRequest.getDescription())
                .application(divisionRequest.getApplication())
                .category(divisionRequest.getCategory())
                .brand(divisionRequest.getBrand())
                .build()).forEach(curDivision -> divisionRepository.save(curDivision));

        return true;
    }

    @Override
    @Transactional
    public boolean deleteDivision(String division) {
        log.info("Deleting division: {}", division);

        divisionRepository.deleteById(division);

        analyticalProductService.deleteProductsByDivision(division);
        industrialProductService.deleteProductsByDivision(division);
        instrumentationProductService.deleteProductsByDivision(division);
        lifeScienceProductService.deleteProductsByDivision(division);
        return true;
    }
}
