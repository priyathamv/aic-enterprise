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
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.aic.aicenterprise.constants.AppConstants.ADMIN;

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

        FeaturedProduct product = new FeaturedProduct();
        product.setCode(code);
        product.setName(name);
        product.setBrand(brand);
        product.setCapacity(capacity);
        product.setPack(pack);
        product.setDivision(division);
        product.setDescription(description);
        product.setOwner(ADMIN);
        product.setFeatured(false);
        product.setCreateTs(curDate);
        product.setUpdateTs(curDate);
        return product;
    }

}
