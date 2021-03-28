package com.aic.aicenterprise.controllers;

import static com.aic.aicenterprise.constants.AppConstants.LIFE_SCIENCE_PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.LIFE_SCIENCE_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import com.aic.aicenterprise.models.requests.product.SaveLifeScienceProductsRequest;
import com.aic.aicenterprise.models.responses.product.LifeScienceProductDetailResponse;
import com.aic.aicenterprise.models.responses.product.LifeScienceProductListResponse;
import com.aic.aicenterprise.models.responses.BrandListResponse;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.product.ProductService2;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = LIFE_SCIENCE_PRODUCTS_PATH)
public class LifeScienceProductController {

    private ProductService2<LifeScienceProduct> lifeScienceProductService;


    @Autowired
    public LifeScienceProductController(@Qualifier(LIFE_SCIENCE_PRODUCT_SERVICE_BEAN) ProductService2<LifeScienceProduct> lifeScienceProductService) {
        this.lifeScienceProductService = lifeScienceProductService;
    }


    @GetMapping(value = "")
    public LifeScienceProductListResponse getAllLifeScienceProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "division", required = false) String division,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Getting life science products under the brand: {} and division: {}", brand, division);
        LifeScienceProductListResponse productListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);

            List<LifeScienceProduct> productList = lifeScienceProductService
                .getProductList(category, brand, division, searchValue, pageable);

            productListResponse = LifeScienceProductListResponse.builder()
                    .payload(productList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while fetching life science products: {}", ex);
            productListResponse = LifeScienceProductListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching life science products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productListResponse;
    }

    @GetMapping(value = "/details")
    public LifeScienceProductDetailResponse getLifeScienceProductDetails(
        @RequestParam(value = "productId", required = false) String productId) {
        log.info("Getting product details for Id: {}", productId);

        LifeScienceProductDetailResponse productListResponse;
        try {
            LifeScienceProduct productDetails = lifeScienceProductService.getProductDetails(productId);

            productListResponse = LifeScienceProductDetailResponse.builder()
                .payload(productDetails)
                .msg(SUCCESS)
                .status(HttpStatus.OK.value())
                .build();
        } catch (Exception ex) {
            log.info("Exception while fetching life science product details: {}", ex);
            productListResponse = LifeScienceProductDetailResponse.builder()
                .error(ex.toString())
                .msg("Exception while fetching life science product details")
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .payload(null)
                .build();
        }
        return productListResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveLifeScienceProducts(@RequestBody SaveLifeScienceProductsRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = lifeScienceProductService.saveProducts(request.getProductList());
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving life science products: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving life science products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/delete")
    public SaveResponse deleteLifeScienceProduct(@RequestBody Map<String, String> productMap) {
        SaveResponse deleteResponse;
        try {
            boolean deleteStatus = lifeScienceProductService.deleteProduct(productMap.get("productId"));
            deleteResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while deleting life science product: {}", ex);
            deleteResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting life science product")
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
            List<String> divisionList = lifeScienceProductService.getDivisions(brand);
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
        log.info("Getting life science products count");

        CountResponse countResponse;
        try {
            long totalProducts = lifeScienceProductService.getTotalProducts();
            countResponse = CountResponse.builder()
                    .payload(totalProducts)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching life science products count: {}", ex);
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching life science products count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }


    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() {
        log.info("Deleting all life science products...");
        return lifeScienceProductService.deleteAllProducts();
    }

}
