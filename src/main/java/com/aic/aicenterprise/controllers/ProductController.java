package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Product;
import com.aic.aicenterprise.models.BrandListResponse;
import com.aic.aicenterprise.models.ProductListResponse;
import com.aic.aicenterprise.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.PRODUCTS_PATH;

@Slf4j
@RestController
@RequestMapping(value = PRODUCTS_PATH)
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @GetMapping(value = "")
    public ProductListResponse getAllProducts(@RequestParam(value = "brand", required = false) String brand) {
        log.info("Getting products under the brand: {}", brand);
        ProductListResponse productListResponse;
        try {
            List<Product> productList = productService.getAllProductsByBrand(brand);
            productListResponse = ProductListResponse.builder()
                    .payload(productList)
                    .msg("success")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching products: {}", ex);
            productListResponse = ProductListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productListResponse;
    }

    @GetMapping(value = "/brands")
    public BrandListResponse getAllBrands() {
        log.info("Getting all brands");

        BrandListResponse brandListResponse;
        try {
            List<String> brandList = productService.getAllBrands();
            brandListResponse = BrandListResponse.builder()
                    .payload(brandList)
                    .msg("success")
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching brands: {}", ex);
            brandListResponse = BrandListResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching brands")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return brandListResponse;
    }

    @PostMapping(value = "/load-products")
    public boolean loadProducts() throws IOException {
        log.info("Loading all products from excel sheets...");
        return productService.loadFromExcel();
    }

    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() throws IOException {
        log.info("Deleting all products...");
        return productService.deleteAllProducts();
    }

}
