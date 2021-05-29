package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.models.requests.brand.BrandHierarchy;
import com.aic.aicenterprise.models.requests.brand.BrandRequest;
import com.aic.aicenterprise.repositories.BrandRepository;
import com.aic.aicenterprise.services.product.ProductService2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.aic.aicenterprise.constants.AppConstants.*;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;
    private ProductService2<AnalyticalProduct> analyticalProductService;
    private ProductService2<IndustrialProduct> industrialProductService;
    private ProductService2<InstrumentationProduct> instrumentationProductService;
    private ProductService2<LifeScienceProduct> lifeScienceProductService;

    @Autowired
    public BrandServiceImpl(
        BrandRepository brandRepository,
        ProductService2<AnalyticalProduct> analyticalProductService,
        ProductService2<IndustrialProduct> industrialProductService,
        ProductService2<InstrumentationProduct> instrumentationProductService,
        ProductService2<LifeScienceProduct> lifeScienceProductService) {
        this.brandRepository = brandRepository;
        this.analyticalProductService = analyticalProductService;
        this.industrialProductService = industrialProductService;
        this.instrumentationProductService = instrumentationProductService;
        this.lifeScienceProductService = lifeScienceProductService;
    }


    @Override
    public List<Brand> fetchBrands() {
        log.info("Fetching all brands...");

        return StreamSupport.stream(brandRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public boolean generateBrands() {

        List<List<String>> brandsData = Arrays.asList(
            Arrays.asList("Analytical", "Chromatography", "Thermo Scientific Column & Vial", "Thermo Fisher Scientific"),
            Arrays.asList("Analytical", "Chromatography", "Merck Columns", "Merck"),
            Arrays.asList("Analytical", "Chromatography", "Borosil Vials", "Borosil"),
            Arrays.asList("Analytical", "Chromatography", "Hamilton Syringe", "HAMILTON"),
            Arrays.asList("Analytical", "Solvents", "Honeywell", "Honeywell"),
            Arrays.asList("Analytical", "Solvents", "Merck", "Merck"),
            Arrays.asList("Analytical", "Solvents", "Sigma", "SIGMA-ALDRICH"),
            Arrays.asList("Analytical", "Buffers & Standards", "Eutech", "Eutech"),
            Arrays.asList("Analytical", "Buffers & Standards", "Reagecon", "Reagecon"),
            Arrays.asList("Analytical", "Buffers & Standards", "Hamilton", "HAMILTON"),
            Arrays.asList("Analytical", "Buffers & Standards", "Merck", "Merck"),
            Arrays.asList("Analytical", "Laboratory Filtration", "Merck Millipore", "Merck"),
            Arrays.asList("Analytical", "Laboratory Filtration", "Whatman", "Whatman"),
            Arrays.asList("Analytical", "Laboratory Filtration", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Analytical", "Laboratory Filtration", "AIC", "AIC"),
            Arrays.asList("Analytical", "Laboratory Glassware", "Borosil", "Borosil"),
            Arrays.asList("Analytical", "Laboratory Glassware", "Duran", "Duran"),
            Arrays.asList("Analytical", "Laboratory Glassware", "Rivera", "RIVIERA"),
            Arrays.asList("Life Science", "Genomics", "Abgene Flnzymes", "Abgene Flnzymes"),
            Arrays.asList("Life Science", "Genomics", "Invitrogen", "Invitrogen"),
            Arrays.asList("Life Science", "Proteomics", "Invitrogen", "Invitrogen"),
            Arrays.asList("Life Science", "Proteomics", "Pierce", "Pierce"),
            Arrays.asList("Life Science", "Antibodies", "Ebioscience", "Ebioscience"),
            Arrays.asList("Life Science", "Antibodies", "Pierce", "Pierce"),
            Arrays.asList("Life Science", "Cell Culture", "Nunc, Nalgene", "Nunc, Nalgene"),
            Arrays.asList("Life Science", "Cell Culture", "Gibco Media & Serum", "Gibco Media & Serum"),
            Arrays.asList("Life Science", "Cell Culture", "Genaxy", "Genaxy"),
            Arrays.asList("Life Science", "Cell Culture", "Abdos", "Abdos"),
            Arrays.asList("Life Science", "Cryoware", "Nunc, Nalgene", "Nunc, Nalgene"),
            Arrays.asList("Life Science", "Cryoware", "Genaxy", "Genaxy"),
            Arrays.asList("Life Science", "Cryoware", "Abdos", "Abdos"),
            Arrays.asList("Life Science", "Liquid Handling", "Thermo Finn Pipette & Tips", "Thermo Finn Pipette & Tips"),
            Arrays.asList("Life Science", "Liquid Handling", "Genaxy Nichiro Pitelles & Tips", "Genaxy Nichiro Pitelles & Tips"),
            Arrays.asList("Life Science", "Liquid Handling", "Abdos Tips", "Abdos"),
            Arrays.asList("Life Science", "Liquid Handling", "AIC student Pipetttes", "AIC student Pipetttes"),
            Arrays.asList("Life Science", "Microbiology", "Genaxy/Abdos Petridishes", "Genaxy/Abdos Petridishes"),
            Arrays.asList("Life Science", "Microbiology", "Conda Media", "Conda"),
            Arrays.asList("Life Science", "Microbiology", "SRL Media", "SRL"),
            Arrays.asList("Life Science", "Storage Bottles & Carboys", "Nalgene", "Nalgene"),
            Arrays.asList("Life Science", "Storage Bottles & Carboys", "Abdos", "Abdos"),
            Arrays.asList("Life Science", "General Labware", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Life Science", "General Labware", "Abdos", "Abdos"),
            Arrays.asList("Instrumentation", "Laboratory Instruments", "AIC", "AIC"),
            Arrays.asList("Instrumentation", "Laboratory Instruments", "Neuation", "Neuation"),
            Arrays.asList("Instrumentation", "Laboratory Instruments", "Borosil", "Borosil"),
            Arrays.asList("Instrumentation", "Centruifuge", "Neuation", "Neuation"),
            Arrays.asList("Instrumentation", "Centruifuge", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Instrumentation", "Electrophoresis", "AIC", "AIC"),
            Arrays.asList("Instrumentation", "Electrophoresis", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Instrumentation", "PCR", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Instrumentation", "Western Blotting", "Thermo Fisher", "Thermo Fisher Scientific"),
            Arrays.asList("Instrumentation", "Western Blotting", "AIC", "AIC"),
            Arrays.asList("Industrial Safety and Clean room", "Wipers", "Kimtech from Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Wipers", "Wypall from Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Wipers", "Ergo clean", "Ergoclean"),
            Arrays.asList("Industrial Safety and Clean room", "Safety Products", "Kleenguard from Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Safety Products", "Honeywell", "Honeywell"),
            Arrays.asList("Industrial Safety and Clean room", "Clean Room Sanitization Solution", "Ergo clean", "Ergoclean"),
            Arrays.asList("Industrial Safety and Clean room", "Clean Room Sanitization Solution", "Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Clean Room Apparel", "Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Clean Room Apparel", "Honeywell", "Honeywell"),
            Arrays.asList("Industrial Safety and Clean room", "Floor Cleaning", "Tuskey from Diversey", "Tuskey from Diversey"),
            Arrays.asList("Industrial Safety and Clean room", "Housekeeping Solution", "Scott from Kiberly Clark", "Kimberly-Clark"),
            Arrays.asList("Industrial Safety and Clean room", "Housekeeping Solution", "Soft touch from Diversey", "Soft touch from Diversey")
        );

        brandsData.stream()
            .map(curBrandAsArr -> Brand.builder()
                .compositeKey(getCompositeKey(curBrandAsArr))
                .name(curBrandAsArr.get(3))
                .application(curBrandAsArr.get(0))
                .category(curBrandAsArr.get(1))
                .description(curBrandAsArr.get(2))
                .build())
            .forEach(curBrand -> brandRepository.save(curBrand));
        return true;
    }

    @Override
    public boolean createBrand(BrandRequest brandRequest) {
        log.info("Creating brand: {}", brandRequest);

        brandRequest.getHierarchyList().stream()
            .map(curHierarchy -> new Brand(
                getCompositeKey(curHierarchy, brandRequest.getName()),
                brandRequest.getName(),
                curHierarchy.getApplication(),
                curHierarchy.getCategory(),
                brandRequest.getDescription()
            )).forEach(curBrand -> brandRepository.save(curBrand));
        return true;
    }

    @Override
    @Transactional
    public boolean deleteBrand(Brand brand) {
        log.info("Deleting brand: {}", brand);
        brandRepository.deleteById(getCompositeKey(brand));

        switch (brand.getApplication()) {
            case ANALYTICAL_APPLICATION:
                analyticalProductService.deleteProductsByBrandAndCategory(brand.getName(), brand.getCategory());
                break;
            case INDUSTRIAL_APPLICATION:
                industrialProductService.deleteProductsByBrandAndCategory(brand.getName(), brand.getCategory());
                break;
            case INSTRUMENTATION_APPLICATION:
                instrumentationProductService.deleteProductsByBrandAndCategory(brand.getName(), brand.getCategory());
                break;
            case LIFE_SCIENCE_APPLICATION:
                lifeScienceProductService.deleteProductsByBrandAndCategory(brand.getName(), brand.getCategory());
                break;
        }
        return true;
    }

    private String getCompositeKey(List<String> stringList) {
        return stringList.get(0) + "-" + stringList.get(1) + "-" + stringList.get(3);
    }

    private String getCompositeKey(Brand brand) {
        return brand.getApplication() + "-" + brand.getCategory() + "-" + brand.getName();
    }

    private String getCompositeKey(BrandHierarchy brandHierarchy, String name) {
        return brandHierarchy.getApplication() + "-" + brandHierarchy.getCategory() + "-" + name;
    }
}
