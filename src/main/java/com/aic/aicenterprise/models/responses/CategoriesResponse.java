package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoriesResponse extends BaseResponse<List<Category>> {

    @Builder
    public CategoriesResponse(int status, String error, String msg, List<Category> payload) {
        super(status, error, msg, payload);
    }

}
