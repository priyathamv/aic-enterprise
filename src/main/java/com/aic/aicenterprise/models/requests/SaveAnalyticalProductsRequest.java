package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.entities.product.AnalyticalProduct;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaveAnalyticalProductsRequest {
    private List<AnalyticalProduct> productList;
}
