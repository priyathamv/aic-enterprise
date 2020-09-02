package com.aic.aicenterprise.models;

import com.aic.aicenterprise.entities.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProductListResponse extends BaseResponse<List<Product>> {

    @Builder
    public ProductListResponse(int status, String error, String msg, List<Product> payload) {
        super(status, error, msg, payload);
    }

}
