package com.aic.aicenterprise.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class ProductDetails {
    private String code;
    private String name;
    private String brand;
    private String division;
    private String capacity;
    private String pack;
    private List<String> imageUrls;
    private int quantity;
}
