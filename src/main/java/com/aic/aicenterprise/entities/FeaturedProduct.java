package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

import static com.aic.aicenterprise.constants.DBConstants.FEATURED_PRODUCTS;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
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
    private String imageUrl;
    private boolean isFeatured = true;
    private Date createTs;
    private Date updateTs;
}
