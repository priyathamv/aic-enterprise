package com.aic.aicenterprise.models.requests.product;

import com.aic.aicenterprise.entities.product.LifeScienceProduct;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveLifeScienceProductsRequest {
    private List<LifeScienceProduct> productList;
}
