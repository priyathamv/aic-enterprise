package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserEntity {
    private String firstName;

    private String lastName;

    @Id
    private String email;

    private String imageUrl;

    private String phoneNumber;

    private String password;

    private List<Address> addressList;

    private String resetPasswordToken;

    private Date resetPasswordExpires;
}
