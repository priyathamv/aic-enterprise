package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Product;
import com.aic.aicenterprise.repositories.ProductRepository;
import com.mongodb.client.MongoCursor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.Objects.isNull;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private MongoTemplate mongoTemplate;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, MongoTemplate mongoTemplate) {
        this.productRepository = productRepository;
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<Product> getAllProductsByBrand(String brand) {
        return isNull(brand) ?
                productRepository.findAll() :
                productRepository.findByBrand(brand);
    }

    @Override
    public boolean loadFromExcel() throws IOException {
        String excelFilesPath = "src/main/resources/aic-products/";

        // Iterating over all the files in the Products excel folder
        try (Stream<Path> filePathsStream = Files.walk(Paths.get(excelFilesPath))) {
            List<String> fileNameList = filePathsStream
                    .filter(Files::isRegularFile)
                    .map(curFile -> curFile.getFileName().toString())
                    .collect(Collectors.toList());

            log.info("fileNameList.size(): {}", fileNameList.size());

            // Reading all the files and fetching valid URLs
            List<Product> completeProductList = fileNameList
                    .stream()
                    .map(curFileName -> {
                        try {
                            log.info("Reading file: {}", curFileName);
                            Workbook workbook = WorkbookFactory.create(new File(excelFilesPath + curFileName));
                            Sheet sheet = workbook.getSheetAt(0);

                            DataFormatter dataFormatter = new DataFormatter();

                            List<Product> productList = new ArrayList<>();
                            sheet.forEach(curRow -> {
                                if (curRow.getRowNum() >= 5) {
                                    Product curProduct = getProductFromRow(curRow, dataFormatter);
                                    productList.add(curProduct);
                                }
                            });

                            workbook.close();

                            return productList;
                        } catch (IOException e) {
                            log.info("Exception while reading the product excel files: {}", e);
                            return new ArrayList<Product>();
                        }
                    })
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());

            completeProductList.forEach(curProduct -> productRepository.save(curProduct));

            return true;
        }
    }

    @Override
    public boolean deleteAllProducts() {
        productRepository.deleteAll();
        return true;
    }

    @Override
    public List<String> getAllBrands() {
        MongoCursor<String> brandListCursor = mongoTemplate.getCollection("products").distinct("brand", String.class).iterator();
        List<String> brandList = new ArrayList<>();
        brandListCursor.forEachRemaining(brandList::add);
        return brandList;
    }

    private Product getProductFromRow(Row row, DataFormatter dataFormatter) {
        String code = dataFormatter.formatCellValue(row.getCell(1)).trim();
        String name = dataFormatter.formatCellValue(row.getCell(2)).trim();
        String brand = dataFormatter.formatCellValue(row.getCell(5)).trim();
        String pack = dataFormatter.formatCellValue(row.getCell(6)).trim();
        Date curDate = new Date();
        log.info("CODE: {}, NAME: {}, PACK: {}", code, name, pack);

        Product product = new Product();
        product.setCode(code);
        product.setName(name);
        product.setBrand(brand);
        product.setPack(pack);
        product.setOwner("admin");
        product.setCreateTs(curDate);
        product.setUpdateTs(curDate);
        return product;
    }

}
