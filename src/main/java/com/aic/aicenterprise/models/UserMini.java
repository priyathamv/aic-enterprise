package com.aic.aicenterprise.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserMini {
    private String firstName;

    private String lastName;

    private String email;

    private String imageUrl;

    private UserRole userRole;
}
