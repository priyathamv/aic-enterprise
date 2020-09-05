package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserEntity {
    private String name;

    @Id
    private String email;

    private String phoneNumber;

    private String password;
}
