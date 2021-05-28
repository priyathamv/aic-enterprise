package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.entities.Category;

import java.util.List;

public interface CategoryService {
    List<Category> fetchCategories();
    boolean generateCategories();
    boolean createCategory(Category category);
    boolean deleteCategory(String category);
}
