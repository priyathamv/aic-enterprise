package com.aic.aicenterprise.controllers;

import static com.aic.aicenterprise.constants.AppConstants.INSTRUMENTATION_PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.INSTRUMENTATION_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import com.aic.aicenterprise.models.requests.product.SaveInstrumentationProductsRequest;
import com.aic.aicenterprise.models.responses.BrandListResponse;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.models.responses.product.InstrumentationProductDetailResponse;
import com.aic.aicenterprise.models.responses.product.InstrumentationProductListResponse;
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
@RequestMapping(value = INSTRUMENTATION_PRODUCTS_PATH)
public class InstrumentationProductController {

    private ProductService2<InstrumentationProduct> instrumentationProductService;

    @Autowired
    public InstrumentationProductController(
        @Qualifier(INSTRUMENTATION_PRODUCT_SERVICE_BEAN) ProductService2<InstrumentationProduct> instrumentationProductService) {
        this.instrumentationProductService = instrumentationProductService;
    }


    @GetMapping(value = "")
    public InstrumentationProductListResponse getAllInstrumentationProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "division", required = false) String division,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Getting instrumentation products under the brand: {} and division: {}", brand, division);
        InstrumentationProductListResponse productListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);

            List<InstrumentationProduct> productList = instrumentationProductService
                .getProductList(category, brand, division, searchValue, pageable);

            productListResponse = InstrumentationProductListResponse.builder()
                    .payload(productList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while fetching instrumentation products: {}", ex);
            productListResponse = InstrumentationProductListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching instrumentation products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productListResponse;
    }

    @GetMapping(value = "/details")
    public InstrumentationProductDetailResponse getInstrumentationProductDetails(
        @RequestParam(value = "productId", required = false) String productId) {
        log.info("Getting product details for Id: {}", productId);

        InstrumentationProductDetailResponse productListResponse;
        try {
            InstrumentationProduct productDetails = instrumentationProductService.getProductDetails(productId);

            productListResponse = InstrumentationProductDetailResponse.builder()
                .payload(productDetails)
                .msg(SUCCESS)
                .status(HttpStatus.OK.value())
                .build();
        } catch (Exception ex) {
            log.info("Exception while fetching instrumentation product details: {}", ex);
            productListResponse = InstrumentationProductDetailResponse.builder()
                .error(ex.toString())
                .msg("Exception while fetching instrumentation product details")
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .payload(null)
                .build();
        }
        return productListResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveInstrumentationProducts(@RequestBody SaveInstrumentationProductsRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = instrumentationProductService.saveProducts(request.getProductList());
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving instrumentation products: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving instrumentation products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/delete")
    public SaveResponse deleteInstrumentationProduct(@RequestBody Map<String, String> productMap) {
        SaveResponse deleteResponse;
        try {
            boolean deleteStatus = instrumentationProductService.deleteProduct(productMap.get("productId"));
            deleteResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while deleting instrumentation product: {}", ex);
            deleteResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting instrumentation product")
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
            List<String> divisionList = instrumentationProductService.getDivisions(brand);
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
        log.info("Getting instrumentation products count");

        CountResponse countResponse;
        try {
            long totalProducts = instrumentationProductService.getTotalProducts();
            countResponse = CountResponse.builder()
                    .payload(totalProducts)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching instrumentation products count: {}", ex);
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching instrumentation products count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }


    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() {
        log.info("Deleting all instrumentation products...");
        return instrumentationProductService.deleteAllProducts();
    }

}
