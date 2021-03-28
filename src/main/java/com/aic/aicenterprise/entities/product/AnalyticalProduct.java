package com.aic.aicenterprise.entities.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.ANALYTICAL_PRODUCTS;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = ANALYTICAL_PRODUCTS)
public class AnalyticalProduct {
    @Id
    private String productId;
    private String application;
    private String category;
    private String division;
    private String brand;
    private String name;
    private String hsnCode;
    private String description;
    private String specification;
    private List<ProductMetrics> metricsList;
    private String model;
    private String volume;
    private String gauge;
    private List<String> imageUrls;
    private String auxilaryImageUrl;
    private String owner;
    private Date createTs;
    private Date updateTs;
}
