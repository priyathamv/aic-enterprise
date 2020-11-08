package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.entities.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaveProductsRequest {
    private List<Product> productList;
}
