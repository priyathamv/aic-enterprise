package com.aic.aicenterprise.entities;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductDetails {
    private String code;
    private String name;
    private String brand;
    private String capacity;
    private String pack;
    private String imageUrl;
    private int quantity;
}
