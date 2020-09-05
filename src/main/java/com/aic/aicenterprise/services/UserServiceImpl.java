package com.aic.aicenterprise.services;

import com.aic.aicenterprise.entities.UserEntity;
import com.aic.aicenterprise.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Slf4j
@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean saveUser(UserEntity userEntity) {
        UserEntity userFromDB = userRepository.findByEmail(userEntity.getEmail());
        if (nonNull(userFromDB) && nonNull(userFromDB.getEmail()))
            return false;

        UserEntity savedUserEntity = userRepository.save(userEntity);
        return savedUserEntity.getEmail().equals(userEntity.getEmail());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity applicationUserEntity = userRepository.findByEmail(username);
        if (applicationUserEntity == null) {
            throw new UsernameNotFoundException(username);
        }
        return new org.springframework.security.core.userdetails.User(
                applicationUserEntity.getEmail(),
                applicationUserEntity.getPassword(),
                emptyList()
        );
    }

}
