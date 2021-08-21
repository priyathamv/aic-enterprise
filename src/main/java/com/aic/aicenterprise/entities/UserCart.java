package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.CARTS;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = CARTS)
public class UserCart {
    @Id
    private String email;

    private String name;

    private List<UserProduct> cartItems;
}
