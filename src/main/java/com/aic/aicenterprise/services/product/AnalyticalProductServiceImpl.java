package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.exceptions.AnalyticalProductNotFoundException;
import com.aic.aicenterprise.repositories.product.AnalyticalProductRepository;
import com.mongodb.client.MongoCursor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.aic.aicenterprise.constants.DBConstants.ANALYTICAL_PRODUCTS;
import static com.aic.aicenterprise.constants.DBConstants.BRAND;
import static com.aic.aicenterprise.constants.DBConstants.DIVISION;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class AnalyticalProductServiceImpl implements AnalyticalProductService {

    private AnalyticalProductRepository analyticalProductRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public AnalyticalProductServiceImpl(AnalyticalProductRepository analyticalProductRepository, MongoTemplate mongoTemplate) {
        this.analyticalProductRepository = analyticalProductRepository;
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<AnalyticalProduct> getProductList(String brand, String division, String searchValue, Pageable pageable) {
        if (nonNull(brand) && nonNull(searchValue))
            return analyticalProductRepository.findByBrandIgnoreCaseAndNameLikeIgnoreCase(brand, searchValue, pageable);
        else if (nonNull(brand)) {
            return nonNull(division) ?
                    analyticalProductRepository.findByBrandIgnoreCaseAndDivisionIgnoreCase(brand, division, pageable) :
                    analyticalProductRepository.findByBrandIgnoreCase(brand, pageable);
        }
        else if (nonNull(searchValue))
            return analyticalProductRepository.findByNameLikeIgnoreCase(searchValue, pageable);
        else
            return analyticalProductRepository.findAll(pageable).getContent();
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
            .orElseThrow(AnalyticalProductNotFoundException::new);
    }
}
