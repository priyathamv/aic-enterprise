package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.FeaturedProduct;
import com.aic.aicenterprise.entities.UserProduct;
import com.aic.aicenterprise.models.requests.SaveFeaturedProductsRequest;
import com.aic.aicenterprise.models.responses.FeaturedProductListResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.FeaturedProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.FEATURED_PRODUCTS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = FEATURED_PRODUCTS_PATH)
public class FeaturedProductController {

  private FeaturedProductService featuredProductService;


  @Autowired
  public FeaturedProductController(FeaturedProductService featuredProductService) {
    this.featuredProductService = featuredProductService;
  }

  @GetMapping(value = "")
  public FeaturedProductListResponse getFeaturedProducts() {
    log.info("Getting featured products..");
    FeaturedProductListResponse productListResponse;
    try {
      List<UserProduct> productList = featuredProductService.getFeaturedProductList();

      productListResponse = FeaturedProductListResponse.builder()
          .payload(productList)
          .msg(SUCCESS)
          .status(HttpStatus.OK.value())
          .build();
    } catch (Exception ex) {
      log.info("Exception while fetching featured products: {}", ex.getLocalizedMessage());
      productListResponse = FeaturedProductListResponse.builder()
          .error(ex.toString())
          .msg("Exception while fetching featured products")
          .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
          .payload(null)
          .build();
    }
    return productListResponse;
  }


//  @GetMapping(value = "/covid19")
//  public FeaturedProductListResponse getCovid19Products(
//      @RequestParam(value = "pageNo", required = false, defaultValue = "0") Integer pageNo,
//      @RequestParam(value = "limit", required = false, defaultValue = "500") Integer limit) {
//    log.info("Fetching Covid19 products for pageNo: {}, limit: {}", pageNo, limit);
//    FeaturedProductListResponse featuredProductListResponse;
//    try {
//      Pageable pageable = PageRequest.of(pageNo, limit);
//
//      List<FeaturedProduct> productList = featuredProductService.getCovid19ProductList(pageable);
//
//      featuredProductListResponse = FeaturedProductListResponse.builder()
//          .payload(productList)
//          .msg(SUCCESS)
//          .status(HttpStatus.OK.value())
//          .build();
//    } catch (Exception ex) {
//      log.info("Exception while fetching Covid19 products: {}", ex);
//      featuredProductListResponse = FeaturedProductListResponse.builder()
//          .error(ex.toString())
//          .msg("Exception while fetching Covid19 products")
//          .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
//          .payload(null)
//          .build();
//    }
//    return featuredProductListResponse;
//  }

  @PostMapping("/save")
  public SaveResponse saveProducts(@RequestBody SaveFeaturedProductsRequest request) {
    SaveResponse confirmResponse;
    try {
      boolean saveStatus = featuredProductService.saveFeaturedProducts(request.getProductList());
      confirmResponse = SaveResponse.builder()
          .payload(saveStatus)
          .msg(SUCCESS)
          .status(HttpStatus.OK.value())
          .build();

    } catch (Exception ex) {
      log.info("Exception while saving featured products: {}", ex);
      confirmResponse = SaveResponse.builder()
          .error(ex.toString())
          .msg("Exception while saving featured products")
          .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
          .payload(false)
          .build();
    }
    return confirmResponse;
  }

  @PostMapping("/delete")
  public SaveResponse deleteFeaturedProduct(@RequestBody FeaturedProduct featuredProduct) {
    SaveResponse deleteResponse;
    try {
      boolean deleteStatus = featuredProductService.deleteFeaturedProduct(featuredProduct.getCode());
      deleteResponse = SaveResponse.builder()
          .payload(deleteStatus)
          .msg(SUCCESS)
          .status(HttpStatus.OK.value())
          .build();

    } catch (Exception ex) {
      log.info("Exception while deleting featured product: {}", ex);
      deleteResponse = SaveResponse.builder()
          .error(ex.toString())
          .msg("Exception while deleting featured product")
          .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
          .payload(false)
          .build();
    }
    return deleteResponse;
  }

  @PostMapping(value = "/load-products")
  public boolean loadProducts() throws IOException {
    log.info("Loading all featured products from excel sheets...");
    return featuredProductService.loadFromExcel();
  }

  @PostMapping(value = "/delete-products")
  public boolean deleteProducts() throws IOException {
    log.info("Deleting all featured products...");
    return featuredProductService.deleteAllProducts();
  }

}
