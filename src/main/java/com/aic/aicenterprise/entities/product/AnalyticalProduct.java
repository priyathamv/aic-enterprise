package com.aic.aicenterprise.entities.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.aic.aicenterprise.constants.DBConstants.ANALYTICAL_PRODUCTS;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = ANALYTICAL_PRODUCTS)
public class AnalyticalProduct {
    private String code;// is this catalogue number???
    private String name;
    private String description;
    private String od;
    private String height;
    private List<CapacityPack> capacityPackList; // ???
//    private String pack;
    private List<String> imageUrls;
    private double price;
    private String model;
    private String volume;
    private String gauge; // Gauge/L/Pt. Style; // ???
    private String hsnCode;
    private String productCategory;  // category ???
    private String division;
    private String application; // Analytical?
    private String category;
    private String auxilaryImageUrl;
    private String owner;
    private Date createTs;
    private Date updateTs;

//    private String code;
//    private String name;
    private String brand; // ??? Mandatory fields ???
//    private String division;
//    private String capacity;
//    private String pack;
//    private String description;

//    private List<String> imageUrls;

}
