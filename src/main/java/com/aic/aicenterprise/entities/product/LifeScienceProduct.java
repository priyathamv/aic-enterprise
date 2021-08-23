package com.aic.aicenterprise.entities.product;

import static com.aic.aicenterprise.constants.DBConstants.LIFE_SCIENCE_PRODUCTS;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = LIFE_SCIENCE_PRODUCTS)
public class LifeScienceProduct extends ProductBase {
    private List<ProductMetrics> metricsList;
    private String model;
    private String volume;
    private String gauge;
    private String auxilaryImageUrl;
    private String owner;
}
