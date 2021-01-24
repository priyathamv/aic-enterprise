package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import com.aic.aicenterprise.models.requests.SaveAnalyticalProductsRequest;
import com.aic.aicenterprise.models.responses.*;
import com.aic.aicenterprise.services.product.AnalyticalProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.ANALYTICAL_PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = ANALYTICAL_PRODUCTS_PATH)
public class AnalyticalProductController {

    private AnalyticalProductService analyticalProductService;


    @Autowired
    public AnalyticalProductController(AnalyticalProductService analyticalProductService) {
        this.analyticalProductService = analyticalProductService;
    }


    @GetMapping(value = "")
    public AnalyticalProductListResponse getAllAnalyticalProducts(
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "division", required = false) String division,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Getting analytical products under the brand: {} and division: {}", brand, division);
        AnalyticalProductListResponse productListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);

            List<AnalyticalProduct> productList = analyticalProductService.getProductList(brand, division, searchValue, pageable);

            productListResponse = AnalyticalProductListResponse.builder()
                    .payload(productList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while fetching analytical products: {}", ex);
            productListResponse = AnalyticalProductListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching analytical products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productListResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveAnalyticalProducts(@RequestBody SaveAnalyticalProductsRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = analyticalProductService.saveProducts(request.getProductList());
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving analytical products: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving analytical products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/delete")
    public SaveResponse deleteAnalyticalProduct(@RequestBody AnalyticalProduct product) {
        SaveResponse deleteResponse;
        try {
            boolean deleteStatus = analyticalProductService.deleteProduct(product.getCode());
            deleteResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while deleting analytical product: {}", ex);
            deleteResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting analytical product")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return deleteResponse;
    }

    @GetMapping(value = "/divisions")
    public BrandListResponse getDivisions(@RequestParam String brand) {
        log.info("Getting all divisions for the given brand: {}", brand);

        BrandListResponse brandListResponse;
        try {
            List<String> divisionList = analyticalProductService.getDivisions(brand);
            brandListResponse = BrandListResponse.builder()
                    .payload(divisionList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching divisions: {}", ex);
            brandListResponse = BrandListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching divisions")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return brandListResponse;
    }

    @GetMapping(value = "/count")
    public CountResponse getSummary() {
        log.info("Getting analytical products count");

        CountResponse countResponse;
        try {
            long totalProducts = analyticalProductService.getTotalProducts();
            countResponse = CountResponse.builder()
                    .payload(totalProducts)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching analytical products count: {}", ex);
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching analytical products count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }


    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() {
        log.info("Deleting all analytical products...");
        return analyticalProductService.deleteAllProducts();
    }

}
