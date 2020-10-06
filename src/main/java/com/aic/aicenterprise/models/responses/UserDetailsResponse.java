package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsResponse extends BaseResponse<UserEntity> {

    @Builder
    public UserDetailsResponse(int status, String error, String msg, UserEntity payload) {
        super(status, error, msg, payload);
    }

}
