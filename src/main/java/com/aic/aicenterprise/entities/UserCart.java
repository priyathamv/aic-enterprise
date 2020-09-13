package com.aic.aicenterprise.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@ToString
@Document(collection = "carts")
public class UserCart {
    @Id
    private String email;

    private List<CartItem> cartItems;
}
