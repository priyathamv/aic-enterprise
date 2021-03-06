package com.aic.aicenterprise.controllers;

import com.aic.aicenterprise.entities.Brand;
import com.aic.aicenterprise.models.requests.brand.BrandRequest;
import com.aic.aicenterprise.models.responses.BrandsResponse;
import com.aic.aicenterprise.models.responses.CountResponse;
import com.aic.aicenterprise.models.responses.SaveResponse;
import com.aic.aicenterprise.services.BrandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.aic.aicenterprise.constants.AppConstants.BRANDS_PATH;
import static com.aic.aicenterprise.constants.AppConstants.SUCCESS;

@Slf4j
@RestController
@RequestMapping(value = BRANDS_PATH)
public class BrandController {

    private BrandService brandService;

    @Autowired
    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping(value = "")
    public BrandsResponse getAllBrands() {
        log.info("Getting all brands...");
        BrandsResponse brandsResponse;
        try {
            List<Brand> brandList = brandService.fetchBrands();

            brandsResponse = BrandsResponse.builder()
                    .payload(brandList)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching products: {}", ex.getLocalizedMessage());
            brandsResponse = BrandsResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching brands")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return brandsResponse;
    }

    @PostMapping("/save")
    public SaveResponse saveBrand(@RequestBody BrandRequest brand) {
        SaveResponse confirmResponse;
        try {
            boolean saveStatus = brandService.createBrand(brand);
            confirmResponse = SaveResponse.builder()
                    .payload(saveStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while saving brand: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while saving brand")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping("/generate-brands")
    public SaveResponse generateBrands() {
        SaveResponse confirmResponse;
        try {
            boolean generateStatus = brandService.generateBrands();

            confirmResponse = SaveResponse.builder()
                    .payload(generateStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while generating brands: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while generating brands")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @PostMapping(value = "/delete")
    public SaveResponse deleteBrand(@RequestBody Brand brand) {
        SaveResponse confirmResponse;
        try {
            boolean deleteStatus = brandService.deleteBrand(brand);

            confirmResponse = SaveResponse.builder()
                    .payload(deleteStatus)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();
        } catch (Exception ex) {
            log.info("Exception while deleting brand: {}", ex.getLocalizedMessage());
            confirmResponse = SaveResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while deleting brand")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(false)
                    .build();
        }
        return confirmResponse;
    }

    @GetMapping(value = "/count")
    public CountResponse getSummary() {
        log.info("Getting brands count");

        CountResponse countResponse;
        try {
            long totalBrands = brandService.fetchBrands().size();
            countResponse = CountResponse.builder()
                    .payload(totalBrands)
                    .msg(SUCCESS)
                    .status(HttpStatus.OK.value())
                    .build();

        } catch (Exception ex) {
            log.info("Exception while fetching brands count: {}", ex.getLocalizedMessage());
            countResponse = CountResponse.builder()
                    .error(ex.toString())
                    .msg("Exception while fetching brands count")
                    .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .payload(null)
                    .build();
        }
        return countResponse;
    }

}
