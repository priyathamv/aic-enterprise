package com.aic.aicenterprise.services.product;

import static com.aic.aicenterprise.constants.AppConstants.INDUSTRIAL_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.DBConstants.*;
import static com.aic.aicenterprise.constants.DBConstants.CATEGORY;
import static java.util.Objects.nonNull;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.exceptions.Product2NotFoundException;
import com.aic.aicenterprise.repositories.product.IndustrialProductRepository;
import com.mongodb.client.MongoCursor;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Slf4j
@Qualifier(INDUSTRIAL_PRODUCT_SERVICE_BEAN)
@Service
public class IndustrialProductServiceImpl implements ProductService2<IndustrialProduct> {

    private IndustrialProductRepository industrialProductRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public IndustrialProductServiceImpl(IndustrialProductRepository industrialProductRepository, MongoTemplate mongoTemplate) {
        this.industrialProductRepository = industrialProductRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<IndustrialProduct> getProductList(
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

        return mongoTemplate.find(query, IndustrialProduct.class);
    }

    @Override
    public boolean deleteAllProducts() {
        industrialProductRepository.deleteAll();
        return true;
    }

    @Override
    public List<String> getAllBrands() {
        MongoCursor<String> brandListCursor = mongoTemplate
                .getCollection(INDUSTRIAL_PRODUCTS)
                .distinct(BRAND, String.class)
                .iterator();

        List<String> brandList = new ArrayList<>();
        brandListCursor.forEachRemaining(brandList::add);
        return brandList;
    }

    @Override
    public List<String> getAllCategories() {
        MongoCursor<String> categoryListCursor = mongoTemplate
            .getCollection(INDUSTRIAL_PRODUCTS)
            .distinct(CATEGORY, String.class)
            .iterator();

        List<String> categoryList = new ArrayList<>();
        categoryListCursor.forEachRemaining(categoryList::add);
        return categoryList;
    }

    @Override
    public List<String> getDivisions(String brand) {
        MongoCursor<String> divisionListIterator = mongoTemplate
                .getCollection(INDUSTRIAL_PRODUCTS)
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
    public boolean saveProducts(List<IndustrialProduct> productList) {
        Iterable<IndustrialProduct> products = industrialProductRepository.saveAll(productList);

        List<IndustrialProduct> savedProducts = StreamSupport.stream(products.spliterator(), false)
                .collect(Collectors.toList());

        return productList.size() == savedProducts.size();
    }

    @Override
    public boolean deleteProduct(String code) {
        log.info("Deleting industrial product: {}", code);

        industrialProductRepository.deleteById(code);
        return true;
    }

    @Override
    public void deleteProductsByBrand(String brand) {
        log.info("Deleting industrial products of brand: {}", brand);

        industrialProductRepository.deleteByBrand(brand);
    }

    @Override
    public void deleteProductsByCategory(String category) {
        log.info("Deleting industrial products of category: {}", category);

        industrialProductRepository.deleteByCategory(category);
    }

    @Override
    public void deleteProductsByDivision(String division) {
        log.info("Deleting analytical products of division: {}", division);

        industrialProductRepository.deleteByDivision(division);
    }

    @Override
    public long getTotalProducts() {
        return mongoTemplate.query(IndustrialProduct.class)
                .distinct("_id")
                .as(String.class)
                .all()
                .size();
    }

    @Override
    public IndustrialProduct getProductDetails(String productId) {
        return industrialProductRepository
            .findById(productId)
            .orElseThrow(Product2NotFoundException::new);
    }
}
