package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.UserCart;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartResponse extends BaseResponse<UserCart> {

    @Builder
    public CartResponse(int status, String error, String msg, UserCart payload) {
        super(status, error, msg, payload);
    }

}
