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
public class AnalyticalProduct extends ProductBase {
    private List<ProductMetrics> metricsList;
    private String model;
    private String volume;
    private String gauge;
    private String auxilaryImageUrl;
    private String owner;
}
