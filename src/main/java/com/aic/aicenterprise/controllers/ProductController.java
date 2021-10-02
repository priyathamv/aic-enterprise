package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Product;
import com.aic.aicenterprise.models.requests.ProductEnquiryRequest;
import com.aic.aicenterprise.models.requests.SaveProductsRequest;
import com.aic.aicenterprise.models.responses.*;
import com.aic.aicenterprise.services.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

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
    public ProductListResponse getAllProducts(
            @RequestParam(value = "brand", required = false) String brand,
            @RequestParam(value = "division", required = false) String division,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
            @RequestParam(value = "limit", required = false, defaultValue = "20") Integer limit) {
        log.info("Getting products under the brand: {} and division: {}", brand, division);
        ProductListResponse productListResponse;
        try {
            Pageable pageable = PageRequest.of(pageNo, limit);

            List<Product> productList = productService.getProductList(brand, division, searchValue, pageable);

            productListResponse = ProductListResponse.builder()
                    .payload(productList)
                    .msg(SUCCESS)
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

    @PostMapping("/save")
    public SaveResponse saveProducts(@RequestBody SaveProductsRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = productService.saveProducts(request.getProductList());
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving products: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving products")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping("/delete")
    public SaveResponse deleteProduct(@RequestBody Product product) {
        SaveResponse deleteResponse;
        try {
            boolean deleteStatus = productService.deleteProduct(product.getCode());
            deleteResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while deleting product: {}", ex);
            deleteResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting product")
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
            List<String> divisionList = productService.getDivisions(brand);
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

    @PostMapping("/send-enquiry")
    public SaveResponse sendEnquiry(@RequestBody ProductEnquiryRequest request) {
        SaveResponse confirmResponse;
        try {
            boolean confirmStatus = productService.productEnquiry(request);
            confirmResponse = SaveResponse.builder()
                    .payload(confirmStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while sending product enquiry mail: {}", ex);
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while sending product enquiry mail")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping(value = "/count")
    public CountResponse getSummary() {
        log.info("Getting products count");

        CountResponse countResponse;
        try {
            long totalProducts = productService.getTotalProducts();
            countResponse = CountResponse.builder()
                    .payload(totalProducts)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching products count: {}", ex);
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching products count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }

    @PostMapping("/upload-images")
    public ImageUrlsResponse uploadProductImage(@RequestParam("files") List<MultipartFile> files) {
        ImageUrlsResponse productImageResponse;
        try {
            List<String> imageUrls = productService.uploadImages(files);
            productImageResponse = ImageUrlsResponse.builder()
                    .payload(imageUrls)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while uploading product image: {}", ex);
            productImageResponse = ImageUrlsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while uploading product image")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return productImageResponse;
    }


    @PostMapping(value = "/load-products")
    public boolean loadProducts() throws IOException {
        log.info("Loading all products from excel sheets...");
        return productService.loadFromExcel();
    }

    @DeleteMapping(value = "/delete-products")
    public boolean deleteProducts() {
        log.info("Deleting all products...");
        return productService.deleteAllProducts();
    }

}
