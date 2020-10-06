package com.aic.aicenterprise.models.requests;

import com.aic.aicenterprise.models.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoleRequest {
    private String email;
    private UserRole userRole;
}
