package com.aic.aicenterprise.models.requests;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DivisionRequest {
  private List<String> divisionNames;

  private String application;

  private String category;

  private String brand;

  private String description;
}
