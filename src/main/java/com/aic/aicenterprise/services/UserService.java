package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;

public interface UserService {
    boolean saveUser(UserEntity userEntity);

    UserEntity findUserByEmail(String email);
}
