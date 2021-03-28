package com.aic.aicenterprise.models.requests.product;

import com.aic.aicenterprise.entities.product.InstrumentationProduct;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveInstrumentationProductsRequest {
    private List<InstrumentationProduct> productList;
}
