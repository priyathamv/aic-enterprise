package com.aic.aicenterprise.services.product;

import static com.aic.aicenterprise.constants.AppConstants.INSTRUMENTATION_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.DBConstants.*;
import static com.aic.aicenterprise.constants.DBConstants.CATEGORY;
import static java.util.Objects.nonNull;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.exceptions.Product2NotFoundException;
import com.aic.aicenterprise.repositories.product.InstrumentationProductRepository;
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
@Qualifier(INSTRUMENTATION_PRODUCT_SERVICE_BEAN)
@Service
public class InstrumentationProductServiceImpl implements ProductService2<InstrumentationProduct> {

    private InstrumentationProductRepository instrumentationProductRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public InstrumentationProductServiceImpl(InstrumentationProductRepository instrumentationProductRepository, MongoTemplate mongoTemplate) {
        this.instrumentationProductRepository = instrumentationProductRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<InstrumentationProduct> getProductList(
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

        return mongoTemplate.find(query, InstrumentationProduct.class);
    }

    @Override
    public boolean deleteAllProducts() {
        instrumentationProductRepository.deleteAll();
        return true;
    }

    @Override
    public List<String> getAllBrands() {
        MongoCursor<String> brandListCursor = mongoTemplate
                .getCollection(INSTRUMENTATION_PRODUCTS)
                .distinct(BRAND, String.class)
                .iterator();

        List<String> brandList = new ArrayList<>();
        brandListCursor.forEachRemaining(brandList::add);
        return brandList;
    }

    @Override
    public List<String> getAllCategories() {
        MongoCursor<String> categoryListCursor = mongoTemplate
            .getCollection(INSTRUMENTATION_PRODUCTS)
            .distinct(CATEGORY, String.class)
            .iterator();

        List<String> categoryList = new ArrayList<>();
        categoryListCursor.forEachRemaining(categoryList::add);
        return categoryList;
    }

    @Override
    public List<String> getDivisions(String brand) {
        MongoCursor<String> divisionListIterator = mongoTemplate
                .getCollection(INSTRUMENTATION_PRODUCTS)
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
    public boolean saveProducts(List<InstrumentationProduct> productList) {
        Iterable<InstrumentationProduct> products = instrumentationProductRepository.saveAll(productList);

        List<InstrumentationProduct> savedProducts = StreamSupport.stream(products.spliterator(), false)
                .collect(Collectors.toList());

        return productList.size() == savedProducts.size();
    }

    @Override
    public boolean deleteProduct(String code) {
        log.info("Deleting instrumentation product: {}", code);

        instrumentationProductRepository.deleteById(code);
        return true;
    }

    @Override
    public void deleteProductsByBrand(String brand) {
        log.info("Deleting instrumentation products of brand: {}", brand);

        instrumentationProductRepository.deleteByBrand(brand);
    }

    @Override
    public void deleteProductsByCategory(String category) {
        log.info("Deleting instrumentation products of category: {}", category);

        instrumentationProductRepository.deleteByCategory(category);
    }

    @Override
    public void deleteProductsByDivision(String division) {
        log.info("Deleting analytical products of division: {}", division);

        instrumentationProductRepository.deleteByDivision(division);
    }

    @Override
    public long getTotalProducts() {
        return mongoTemplate.query(InstrumentationProduct.class)
                .distinct("_id")
                .as(String.class)
                .all()
                .size();
    }

    @Override
    public InstrumentationProduct getProductDetails(String productId) {
        return instrumentationProductRepository
            .findById(productId)
            .orElseThrow(Product2NotFoundException::new);
    }
}
