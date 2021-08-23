package com.aic.aicenterprise.entities.product;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductBase {
  @Id
  private String productId;
  private String application;
  private String category;
  private String division;
  private String brand;
  private String name;
  private String hsnCode;
  private String description;
  private String specification;
  private String ribbon;
  private List<String> imageUrls;
  private LocalDate createDate;
  private LocalDateTime updateTs = LocalDateTime.now();
}
