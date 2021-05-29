package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.exceptions.Product2NotFoundException;
import com.aic.aicenterprise.repositories.product.AnalyticalProductRepository;
import com.mongodb.client.MongoCursor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.aic.aicenterprise.constants.AppConstants.ANALYTICAL_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.DBConstants.*;
import static java.util.Objects.nonNull;

@Slf4j
@Qualifier(ANALYTICAL_PRODUCT_SERVICE_BEAN)
@Service
public class AnalyticalProductServiceImpl implements ProductService2<AnalyticalProduct> {

    private AnalyticalProductRepository analyticalProductRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public AnalyticalProductServiceImpl(AnalyticalProductRepository analyticalProductRepository, MongoTemplate mongoTemplate) {
        this.analyticalProductRepository = analyticalProductRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<AnalyticalProduct> getProductList(
        String category,
        String brand,
        String division,
        String searchValue,
        Pageable pageable) {

        final Query query = new Query().with(pageable);
        final List<Criteria> criteria = new ArrayList<>();

        if (nonNull(category) && !category.isEmpty())
            criteria.add(Criteria.where("category").regex(category, "i"));

        if (nonNull(division) && !division.isEmpty())
            criteria.add(Criteria.where("division").regex(division, "i"));

        if (nonNull(brand) && !brand.isEmpty())
            criteria.add(Criteria.where("brand").regex(brand, "i"));

        if (nonNull(searchValue) && !searchValue.isEmpty())
            criteria.add(Criteria.where("name").regex(".*" + searchValue + ".*", "i"));

        if (!criteria.isEmpty())
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));

        return mongoTemplate.find(query, AnalyticalProduct.class);
    }

    @Override
    public boolean deleteAllProducts() {
        analyticalProductRepository.deleteAll();
        return true;
    }

    @Override
    public List<String> getAllBrands() {
        MongoCursor<String> brandListCursor = mongoTemplate
                .getCollection(ANALYTICAL_PRODUCTS)
                .distinct(BRAND, String.class)
                .iterator();

        List<String> brandList = new ArrayList<>();
        brandListCursor.forEachRemaining(brandList::add);
        return brandList;
    }

    @Override
    public List<String> getAllCategories() {
        MongoCursor<String> categoryListCursor = mongoTemplate
            .getCollection(ANALYTICAL_PRODUCTS)
            .distinct(CATEGORY, String.class)
            .iterator();

        List<String> categoryList = new ArrayList<>();
        categoryListCursor.forEachRemaining(categoryList::add);
        return categoryList;
    }

    @Override
    public List<String> getDivisions(String brand) {
        MongoCursor<String> divisionListIterator = mongoTemplate
                .getCollection(ANALYTICAL_PRODUCTS)
                .distinct(DIVISION, String.class)
                .filter(new Document(BRAND, brand))
                .iterator();

        List<String> divisionList = new ArrayList<>();
        divisionListIterator.forEachRemaining(curDivision -> {
            if (nonNull(curDivision) && !curDivision.isEmpty())
                divisionList.add(curDivision);
        });
        return divisionList;
    }

    @Override
    public boolean saveProducts(List<AnalyticalProduct> productList) {
        Iterable<AnalyticalProduct> products = analyticalProductRepository.saveAll(productList);

        List<AnalyticalProduct> savedProducts = StreamSupport.stream(products.spliterator(), false)
                .collect(Collectors.toList());

        return productList.size() == savedProducts.size();
    }

    @Override
    public boolean deleteProduct(String code) {
        log.info("Deleting analytical product: {}", code);

        analyticalProductRepository.deleteById(code);
        return true;
    }

    @Override
    public void deleteProductsByBrand(String brand) {
        log.info("Deleting analytical products of brand: {}", brand);

        analyticalProductRepository.deleteByBrand(brand);
    }

    @Override
    public void deleteProductsByCategory(String category) {
        log.info("Deleting analytical products of category: {}", category);

        analyticalProductRepository.deleteByCategory(category);
    }

    @Override
    public void deleteProductsByDivision(String division) {
        log.info("Deleting analytical products of division: {}", division);

        analyticalProductRepository.deleteByDivision(division);
    }

    @Override
    public long getTotalProducts() {
        return mongoTemplate.query(AnalyticalProduct.class)
                .distinct("_id")
                .as(String.class)
                .all()
                .size();
    }

    @Override
    public AnalyticalProduct getProductDetails(String productId) {
        return analyticalProductRepository
            .findById(productId)
            .orElseThrow(Product2NotFoundException::new);
    }

    @Override
    public void deleteProductsByBrandAndCategory(String brand, String category) {
        analyticalProductRepository.deleteByBrandAndCategory(brand, category);
    }
}
