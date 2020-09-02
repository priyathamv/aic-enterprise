package com.aic.aicenterprise.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Setter
@Getter
@Document(collection = "products")
public class Product {
    @Id
    private String code;
    private String name;
    private String brand;
    private String capacity;
    private String pack;
    private String owner;
    private Date createTs;
    private Date updateTs;
}
