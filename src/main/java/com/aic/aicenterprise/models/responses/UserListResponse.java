package com.aic.aicenterprise.models.responses;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.models.UserMini;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserListResponse extends BaseResponse<List<UserMini>> {

    @Builder
    public UserListResponse(int status, String error, String msg, List<UserMini> payload) {
        super(status, error, msg, payload);
    }

}
