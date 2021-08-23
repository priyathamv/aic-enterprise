package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.FEATURED_PRODUCTS;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Deprecated
@Document(collection = FEATURED_PRODUCTS)
public class FeaturedProduct {
    @Id
    private String code;
    private String name;
    private String brand;
    private String division;
    private String capacity;
    private String pack;
    private String description;
    private String owner;
    private List<String> imageUrls;
    private boolean isFeatured = true;
    private Date createTs;
    private Date updateTs;
}
