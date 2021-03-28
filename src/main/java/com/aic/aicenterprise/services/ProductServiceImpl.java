package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.Product;
import com.aic.aicenterprise.models.requests.ProductEnquiryRequest;
import com.aic.aicenterprise.repositories.ProductRepository;
import com.aic.aicenterprise.services.image.ImageService;
import com.mongodb.client.MongoCursor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.*;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import static com.aic.aicenterprise.constants.AppConstants.ADMIN;
import static com.aic.aicenterprise.constants.AppConstants.TAMIL_NADU;
import static com.aic.aicenterprise.constants.DBConstants.BRAND;
import static com.aic.aicenterprise.constants.DBConstants.DIVISION;
import static com.aic.aicenterprise.constants.DBConstants.PRODUCTS;
import static java.util.Objects.nonNull;

// TODO: Deprecated
@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private MongoTemplate mongoTemplate;
    private EmailService emailService;
    private ImageService imageService;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, MongoTemplate mongoTemplate, EmailService emailService, ImageService imageService) {
        this.productRepository = productRepository;
        this.mongoTemplate = mongoTemplate;
        this.emailService = emailService;
        this.imageService = imageService;

    }


    @Override
    public List<Product> getProductList(String brand, String division, String searchValue, Pageable pageable) {
        if (nonNull(brand) && nonNull(searchValue))
            return productRepository.findByBrandIgnoreCaseAndNameLikeIgnoreCase(brand, searchValue, pageable);
        else if (nonNull(brand)) {
            return nonNull(division) ?
                productRepository.findByBrandIgnoreCaseAndDivisionIgnoreCase(brand, division, pageable) :
                productRepository.findByBrandIgnoreCase(brand, pageable);
        }
        else if (nonNull(searchValue))
            return productRepository.findByNameLikeIgnoreCase(searchValue, pageable);
        else
            return productRepository.findAll(pageable).getContent();
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
                            ZipSecureFile.setMinInflateRatio(0);
                            Workbook workbook = WorkbookFactory.create(new File(excelFilesPath + curFileName));

                            List<Product> productList = new ArrayList<>();
                            workbook.sheetIterator()
                                    .forEachRemaining(curSheet -> {
                                        DataFormatter dataFormatter = new DataFormatter();
                                        curSheet.forEach(curRow -> {
                                            if (curRow.getRowNum() > 0) {
                                                Product curProduct = getProductFromRow(curRow, dataFormatter);
                                                if (!curProduct.getCode().isEmpty())
                                                    productList.add(curProduct);
                                            }
                                        });
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
        MongoCursor<String> brandListCursor = mongoTemplate
                .getCollection(PRODUCTS)
                .distinct(BRAND, String.class)
                .iterator();

        List<String> brandList = new ArrayList<>();
        brandListCursor.forEachRemaining(brandList::add);
        return brandList;
    }

    @Override
    public List<String> getDivisions(String brand) {
        MongoCursor<String> divisionListIterator = mongoTemplate
                .getCollection(PRODUCTS)
                .distinct(DIVISION, String.class)
                .filter(new Document(BRAND, brand))
                .iterator();

        List<String> divisionList = new ArrayList<>();
        divisionListIterator.forEachRemaining(curDivision -> {
            if (nonNull(curDivision) && !curDivision.isEmpty())
                divisionList.add(curDivision);
        });
        return divisionList;
    }

    @Override
    public boolean productEnquiry(ProductEnquiryRequest request) {
        List<String> toAddresses =
                TAMIL_NADU.equals(request.getState()) ?
                        Arrays.asList("sales.tn@aicgroup.in", "vinnakotapriyatham@gmail.com") :
                        Arrays.asList("sales@aicgroup.in", "vinnakota4201@gmail.com");

        String productEnquiryHtml = getProductEnquiryHtml(request);

        // Send mail
        return toAddresses.stream()
                .allMatch(toAddress -> {
                    try {
                        return emailService.sendMail(toAddress, "Product enquiry", productEnquiryHtml);
                    } catch (IOException e) {
                        log.info("Exception while sending mail: {}", e);
                        return false;
                    }
                });
    }

    @Override
    public boolean saveProducts(List<Product> productList) {
        Iterable<Product> products = productRepository.saveAll(productList);

        List<Product> savedProducts = StreamSupport.stream(products.spliterator(), false)
                .collect(Collectors.toList());

        return productList.size() == savedProducts.size();
    }

    @Override
    public boolean deleteProduct(String code) {
        log.info("Deleting product: {}", code);

        productRepository.deleteById(code);
        return true;
    }

    @Override
    public void deleteProductsByBrand(String brand) {
        log.info("Deleting products of brand: {}", brand);

        productRepository.deleteByBrand(brand);
    }

    @Override
    public long getTotalProducts() {
        return mongoTemplate.query(Product.class)
                .distinct("_id")
                .as(String.class)
                .all()
                .size();
    }

    @Override
    public List<String> uploadImages(List<MultipartFile> files) throws IOException {
        return files.stream()
                .map(file -> {
                    try {
                        return imageService.getImageUrl(file);
                    } catch (IOException e) {
                        log.info("Exception while uploading product image: {}", e.getMessage());
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private String getProductEnquiryHtml(ProductEnquiryRequest request) {
        return null;
    }

    private Product getProductFromRow(Row row, DataFormatter dataFormatter) {
        String code = dataFormatter.formatCellValue(row.getCell(0)).trim();
        String name = dataFormatter.formatCellValue(row.getCell(1)).trim();
        String brand = dataFormatter.formatCellValue(row.getCell(3)).trim();
        String capacity = dataFormatter.formatCellValue(row.getCell(4)).trim();
        String pack = dataFormatter.formatCellValue(row.getCell(5)).trim();
        String division = dataFormatter.formatCellValue(row.getCell(6)).trim();
        Date curDate = new Date();
        log.info("CODE: {}, NAME: {}, CAPACITY: {}, PACK: {}", code, name, capacity, pack);

        Product product = new Product();
        product.setCode(code);
        product.setName(name);
        product.setBrand(brand);
        product.setCapacity(capacity);
        product.setPack(pack);
        product.setDivision(division);
        product.setOwner(ADMIN);
        product.setCreateTs(curDate);
        product.setUpdateTs(curDate);
        return product;
    }

}
