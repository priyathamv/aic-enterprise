package com.aic.aicenterprise.services.product;

import com.aic.aicenterprise.entities.UserProduct;

import java.util.List;

public interface AllProductsService {
  List<UserProduct> fetchProductsByRibbon(String ribbon, Integer pageNo, Integer limit);
}
