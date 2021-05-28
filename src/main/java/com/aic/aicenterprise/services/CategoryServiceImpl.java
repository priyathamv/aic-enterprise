package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Category;
import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.repositories.CategoryRepository;
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
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private ProductService2<AnalyticalProduct> analyticalProductService;
    private ProductService2<IndustrialProduct> industrialProductService;
    private ProductService2<InstrumentationProduct> instrumentationProductService;
    private ProductService2<LifeScienceProduct> lifeScienceProductService;

    @Autowired
    public CategoryServiceImpl(
        CategoryRepository categoryRepository,
        ProductService2<AnalyticalProduct> analyticalProductService,
        ProductService2<IndustrialProduct> industrialProductService,
        ProductService2<InstrumentationProduct> instrumentationProductService,
        ProductService2<LifeScienceProduct> lifeScienceProductService) {
        this.categoryRepository = categoryRepository;
        this.analyticalProductService = analyticalProductService;
        this.industrialProductService = industrialProductService;
        this.instrumentationProductService = instrumentationProductService;
        this.lifeScienceProductService = lifeScienceProductService;
    }


    @Override
    public List<Category> fetchCategories() {
        log.info("Fetching all categories...");

        return StreamSupport.stream(categoryRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public boolean generateCategories() {
        Map<String, List<String>> applicationToCategoriesMap = new HashMap<>();
        applicationToCategoriesMap.put("Analytical", Arrays.asList("Chromatography", "Solvents", "Buffers & Standards", "Laboratory Filtration", "Laboratory Glassware"));
        applicationToCategoriesMap.put("Life Science", Arrays.asList("Genomics", "Proteomics", "Antibodies", "Cell Culture", "Cryoware", "Liquid Handling", "Microbiology", "Storage Bottles & Carboys", "General Labware"));
        applicationToCategoriesMap.put("Instrumentation", Arrays.asList("Laboratory Instruments", "Centruifuge", "Electrophoresis", "PCR", "Western Blotting"));
        applicationToCategoriesMap.put("Industrial Safety and Clean room", Arrays.asList("Wipers", "Safety Products", "Clean Room Sanitization Solution", "Clean Room Apparel", "Floor Cleaning", "Housekeeping Solution"));

        List<Category> allCategoryNames = applicationToCategoriesMap.entrySet().stream()
            .map(curApplicationToCategoriesEntry -> {
                String application = curApplicationToCategoriesEntry.getKey();
                return curApplicationToCategoriesEntry.getValue().stream()
                    .map(curCategory -> new Category(curCategory, application, ""))
                .collect(Collectors.toList());
            })
            .flatMap(Collection::stream)
            .collect(Collectors.toList());

        log.info("Total no of unique categories in products table: {}", allCategoryNames.size());

        categoryRepository.saveAll(allCategoryNames);
        return true;
    }

    @Override
    public boolean createCategory(Category category) {
        log.info("Creating category: {}", category);

        Category savedCategory = categoryRepository.save(category);
        return category.getName().equals(savedCategory.getName());
    }

    @Override
    @Transactional
    public boolean deleteCategory(String category) {
        log.info("Deleting category: {}", category);

        categoryRepository.deleteById(category);

        analyticalProductService.deleteProductsByCategory(category);
        industrialProductService.deleteProductsByCategory(category);
        instrumentationProductService.deleteProductsByCategory(category);
        lifeScienceProductService.deleteProductsByCategory(category);
        return true;
    }
}
