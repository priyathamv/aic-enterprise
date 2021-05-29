package com.aic.aicenterprise.models.requests.brand;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BrandRequest {
  private String name;

  private String description;

  private List<BrandHierarchy> hierarchyList;
}
