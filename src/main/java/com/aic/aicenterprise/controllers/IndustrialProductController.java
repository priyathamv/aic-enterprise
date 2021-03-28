package com.aic.aicenterprise.controllers;

import static com.aic.aicenterprise.constants.AppConstants.INDUSTRIAL_PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.INDUSTRIAL_PRODUCT_SERVICE_BEAN;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import com.aic.aicenterprise.models.requests.product.SaveIndustrialProductsRequest;
import com.aic.aicenterprise.models.responses.BrandListResponse;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.models.responses.product.IndustrialProductDetailResponse;
import com.aic.aicenterprise.models.responses.product.IndustrialProductListResponse;
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
@RequestMapping(value = INDUSTRIAL_PRODUCTS_PATH)
public class IndustrialProductController {

    private ProductService2<IndustrialProduct> industrialProductService;

    @Autowired
    public IndustrialProductController(
        @Qualifier(INDUSTRIAL_PRODUCT_SERVICE_BEAN) ProductService2<IndustrialProduct> industrialProductService) {
        this.industrialProductService = industrialProductService;
    }


    @GetMapping(value = "")
    public IndustrialProductListResponse getAllIndustrialProducts(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "division", required = false) String division,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Getting industrial products under the brand: {} and division: {}", brand, division);
        IndustrialProductListResponse productListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);

            List<IndustrialProduct> productList = industrialProductService
                .getProductList(category, brand, division, searchValue, pageable);

            productListResponse = IndustrialProductListResponse.builder()
                    .payload(productList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while fetching industrial products: {}", ex);
            productListResponse = IndustrialProductListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching industrial products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productListResponse;
    }

    @GetMapping(value = "/details")
    public IndustrialProductDetailResponse getIndustrialProductDetails(
        @RequestParam(value = "productId", required = false) String productId) {
        log.info("Getting product details for Id: {}", productId);

        IndustrialProductDetailResponse productListResponse;
        try {
            IndustrialProduct productDetails = industrialProductService.getProductDetails(productId);

            productListResponse = IndustrialProductDetailResponse.builder()
                .payload(productDetails)
                .msg(SUCCESS)
                .status(HttpStatus.OK.value())
                .build();
        } catch (Exception ex) {
            log.info("Exception while fetching industrial product details: {}", ex);
            productListResponse = IndustrialProductDetailResponse.builder()
                .error(ex.toString())
                .msg("Exception while fetching industrial product details")
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .payload(null)
                .build();
        }
        return productListResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveIndustrialProducts(@RequestBody SaveIndustrialProductsRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = industrialProductService.saveProducts(request.getProductList());
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving industrial products: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving industrial products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/delete")
    public SaveResponse deleteIndustrialProduct(@RequestBody Map<String, String> productMap) {
        SaveResponse deleteResponse;
        try {
            boolean deleteStatus = industrialProductService.deleteProduct(productMap.get("productId"));
            deleteResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while deleting industrial product: {}", ex);
            deleteResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting industrial product")
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
            List<String> divisionList = industrialProductService.getDivisions(brand);
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
        log.info("Getting industrial products count");

        CountResponse countResponse;
        try {
            long totalProducts = industrialProductService.getTotalProducts();
            countResponse = CountResponse.builder()
                    .payload(totalProducts)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching industrial products count: {}", ex);
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching industrial products count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }


    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() {
        log.info("Deleting all industrial products...");
        return industrialProductService.deleteAllProducts();
    }

}
