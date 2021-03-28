package com.aic.aicenterprise.models.requests.product;

import com.aic.aicenterprise.entities.product.IndustrialProduct;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveIndustrialProductsRequest {
    private List<IndustrialProduct> productList;
}
