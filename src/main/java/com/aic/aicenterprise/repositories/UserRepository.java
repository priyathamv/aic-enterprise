package com.aic.aicenterprise.repositories;

import com.aic.aicenterprise.entities.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    UserEntity findByEmail(String email);

    UserEntity findByResetPasswordToken(String resetPasswordToken);

    List<UserEntity> findByFirstNameLikeIgnoreCaseOrLastNameLikeIgnoreCaseOrEmailLikeIgnoreCase(String firstName, String lastName, String email, Pageable pageable);
}
