package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.Division;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DivisionsResponse extends BaseResponse<List<Division>> {

    @Builder
    public DivisionsResponse(int status, String error, String msg, List<Division> payload) {
        super(status, error, msg, payload);
    }

}
