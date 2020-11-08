package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.Brand;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BrandsResponse extends BaseResponse<List<Brand>> {

    @Builder
    public BrandsResponse(int status, String error, String msg, List<Brand> payload) {
        super(status, error, msg, payload);
    }

}
