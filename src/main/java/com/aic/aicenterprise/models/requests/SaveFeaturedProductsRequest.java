package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.entities.FeaturedProduct;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SaveFeaturedProductsRequest {
    private List<FeaturedProduct> productList;
}
