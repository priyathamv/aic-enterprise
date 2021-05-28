package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Category;
import com.aic.aicenterprise.models.responses.CategoriesResponse;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.*;

@Slf4j
@RestController
@RequestMapping(value = CATEGORY_PATH)
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping(value = "")
    public CategoriesResponse getAllCategories() {
        log.info("Getting all categories...");
        CategoriesResponse categoriesResponse;
        try {
            List<Category> categoryList = categoryService.fetchCategories();

            categoriesResponse = CategoriesResponse.builder()
                    .payload(categoryList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching categories: {}", ex.getLocalizedMessage());
            categoriesResponse = CategoriesResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching categories")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return categoriesResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveCategory(@RequestBody Category category) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = categoryService.createCategory(category);
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving category: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving category")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping("/generate-categories")
    public SaveResponse generateCategories() {
        SaveResponse confirmResponse;
        try {
            boolean generateStatus = categoryService.generateCategories();

            confirmResponse = SaveResponse.builder()
                    .payload(generateStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while generating categories: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while generating categories")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping(value = "/delete")
    public SaveResponse deleteCategory(@RequestBody Category category) {
        SaveResponse confirmResponse;
        try {
            boolean deleteStatus = categoryService.deleteCategory(category.getName());

            confirmResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while deleting category: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting category")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping(value = "/count")
    public CountResponse getSummary() {
        log.info("Getting categories count");

        CountResponse countResponse;
        try {
            long totalCategories = categoryService.fetchCategories().size();
            countResponse = CountResponse.builder()
                    .payload(totalCategories)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching categories count: {}", ex.getLocalizedMessage());
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching categories count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }

}
