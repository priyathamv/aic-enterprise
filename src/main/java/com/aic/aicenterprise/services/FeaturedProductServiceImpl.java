package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.FeaturedProduct;
import com.aic.aicenterprise.repositories.FeaturedProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.aic.aicenterprise.constants.AppConstants.ADMIN;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class FeaturedProductServiceImpl implements FeaturedProductService {

    private FeaturedProductRepository featuredProductRepository;

    @Autowired
    public FeaturedProductServiceImpl(FeaturedProductRepository featuredProductRepository) {
        this.featuredProductRepository = featuredProductRepository;
    }

    @Override
    public List<FeaturedProduct> getFeaturedProductList(Pageable pageable) {
        log.info("Fetching featured products");
        return featuredProductRepository.findByIsFeaturedTrue(pageable);
    }

    @Override
    public List<FeaturedProduct> getCovid19ProductList(Pageable pageable) {
        log.info("Fetching Covid19 products");
        return featuredProductRepository.findByIsFeaturedFalse(pageable);
    }

    @Override
    public boolean saveFeaturedProducts(List<FeaturedProduct> productList) {
        featuredProductRepository.saveAll(productList);
        return true;
    }

    @Override
    public boolean deleteFeaturedProduct(String code) {
        log.info("Deleting featured product: {}", code);

        featuredProductRepository.deleteById(code);
        return true;
    }

    @Override
    public boolean deleteAllProducts() {
        featuredProductRepository.deleteAll();
        return true;
    }

    @Override
    public List<FeaturedProduct> getFilteredProductList(String brand, String searchValue, Pageable pageable) {
        if (nonNull(brand) && nonNull(searchValue))
            return featuredProductRepository.findByBrandIgnoreCaseAndNameLikeIgnoreCase(brand, searchValue, pageable);
        else if (nonNull(brand))
            return featuredProductRepository.findByBrandIgnoreCase(brand, pageable);
        else if (nonNull(searchValue))
            return featuredProductRepository.findByNameLikeIgnoreCase(searchValue, pageable);
        else
            return featuredProductRepository.findAll(pageable).getContent();
    }

    @Override
    public boolean loadFromExcel() throws IOException {
        String excelFilesPath = "src/main/resources/covid-products/";

        // Iterating over all the files in the Products excel folder
        try (Stream<Path> filePathsStream = Files.walk(Paths.get(excelFilesPath))) {
            List<String> fileNameList = filePathsStream
                    .filter(Files::isRegularFile)
                    .map(curFile -> curFile.getFileName().toString())
                    .collect(Collectors.toList());

            log.info("fileNameList.size(): {}", fileNameList.size());

            // Reading all the files and fetching valid URLs
            List<FeaturedProduct> completeProductList = fileNameList
                    .stream()
                    .map(curFileName -> {
                        try {
                            log.info("Reading file: {}", curFileName);
                            ZipSecureFile.setMinInflateRatio(0);
                            Workbook workbook = WorkbookFactory.create(new File(excelFilesPath + curFileName));

                            List<FeaturedProduct> productList = new ArrayList<>();
                            workbook.sheetIterator()
                                    .forEachRemaining(curSheet -> {
                                        DataFormatter dataFormatter = new DataFormatter();
                                        curSheet.forEach(curRow -> {
                                            if (curRow.getRowNum() > 0) {
                                                FeaturedProduct curProduct = getProductFromRow(curRow, dataFormatter);
                                                if (!curProduct.getCode().isEmpty()) {
                                                    log.info("Featured product: {}", curProduct);
                                                    productList.add(curProduct);
                                                }
                                            }
                                        });
                                    });

                            workbook.close();

                            return productList;
                        } catch (IOException e) {
                            log.info("Exception while reading the Covid19 product excel files: {}", e);
                            return new ArrayList<FeaturedProduct>();
                        }
                    })
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());

            completeProductList.forEach(curProduct -> featuredProductRepository.save(curProduct));

            return true;
        }
    }

    private FeaturedProduct getProductFromRow(Row row, DataFormatter dataFormatter) {
        String code = dataFormatter.formatCellValue(row.getCell(0)).trim();
        String name = dataFormatter.formatCellValue(row.getCell(1)).trim();
        String brand = dataFormatter.formatCellValue(row.getCell(3)).trim();
        String capacity = dataFormatter.formatCellValue(row.getCell(4)).trim();
        String pack = dataFormatter.formatCellValue(row.getCell(5)).trim();
        String division = dataFormatter.formatCellValue(row.getCell(6)).trim();
        String description = dataFormatter.formatCellValue(row.getCell(7)).trim();
        Date curDate = new Date();

        List<String> imageUrls;
        if (name.equals("Vrial RNA Mini Kit"))
            imageUrls = Arrays.asList("/images/covid19/ViralRnaMiniKit.png");
        else if (name.equals("Conical Sterile PP Centrifuge Tubes"))
            imageUrls = Arrays.asList("/images/covid19/ConicalSterilePPCentrifugeTubesthermofisher.png", "/images/covid19/ConicalSterilePPCentrifugeTubesthermofisher2.png", "/images/covid19/ConicalSterilePPCentrifugeTubesthermofisher3.png");
        else if (name.equals("Filter Pipette Tips"))
            imageUrls = Arrays.asList("/images/covid19/FilterPipetteHeads.png", "/images/covid19/FilterPipetteHeads2.png");
        else if (name.equals("Micro Centrifuge Tubes PP"))
            imageUrls = Arrays.asList("/images/covid19/MicroCentrifugeTubesPP.png");
        else if (name.equals("Disposable 3 Ply Mask"))
            imageUrls = Arrays.asList("/images/covid19/3plymask.png", "/images/covid19/3plymask2.png");
        else if (name.equals("ART Barrier Hinged Racj Pippete Tips"))
            imageUrls = Arrays.asList("/images/covid19/ARTBarrierHingedRacjPippeteTips.png", "/images/covid19/ARTBarrierHingedRacjPippeteTips2.png", "/images/covid19/ARTBarrierHingedRacjPippeteTips3.png");
        else if (name.equals("Purple Nitrile Gloves"))
            imageUrls = Arrays.asList("/images/covid19/PurpleNitrileGloves.png", "/images/covid19/PurpleNitrileGloves2.png");
        else if (name.equals("Hand Sanitizer"))
            imageUrls = Arrays.asList("/images/covid19/HandSanitiserAgme.png");
        else if (name.equals("Vortex Mixer"))
            imageUrls = Arrays.asList("/images/covid19/VortexMixer.png", "/images/covid19/VortexMixer2.png");
        else if (name.equals("High Speed Centrifuge"))
            imageUrls = Arrays.asList("/images/covid19/HighSpeedCentrifuge.png", "/images/covid19/HighSpeedCentrifuge2.png", "/images/covid19/Highspeedcentrifuge3.png");
        else if (name.equals("Dry Bath Incubator"))
            imageUrls = Arrays.asList("/images/covid19/DryBathUncubator.png");
        else if (name.equals("Micro Pipettes"))
            imageUrls = Arrays.asList("/images/covid19/Micropipettes.png", "/images/covid19/Micropipettes2.png");
        else if (name.equals("qPCR Strips &Plates For RT-PCR"))
            imageUrls = Arrays.asList("/images/covid19/QCRplaytes.png", "/images/covid19/QCRplayes2.png");
        else
            imageUrls = Arrays.asList();


        FeaturedProduct product = new FeaturedProduct();
        product.setCode(code);
        product.setName(name);
        product.setBrand(brand);
        product.setCapacity(capacity);
        product.setPack(pack);
        product.setDivision(division);
        product.setDescription(description);
        product.setImageUrls(imageUrls);
        product.setOwner(ADMIN);
        product.setFeatured(false);
        product.setCreateTs(curDate);
        product.setUpdateTs(curDate);
        return product;
    }

}
