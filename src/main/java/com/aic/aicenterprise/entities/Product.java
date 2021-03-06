package com.aic.aicenterprise.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.PRODUCTS;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = PRODUCTS)
@Deprecated
public class Product {
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
    private Date createTs;
    private Date updateTs;
}
