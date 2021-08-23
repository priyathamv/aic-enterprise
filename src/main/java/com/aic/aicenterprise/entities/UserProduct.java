package com.aic.aicenterprise.entities;

import com.aic.aicenterprise.entities.product.ProductBase;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProduct {
    private String productId;
    private String application;
    private String category;
    private String division;
    private String brand;
    private String name;
    private List<String> imageUrls;
    private int quantity;
    private LocalDateTime updateTs;
}
