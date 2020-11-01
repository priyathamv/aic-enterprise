package com.aic.aicenterprise.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.CARTS;

@Setter
@Getter
@ToString
@Document(collection = CARTS)
public class UserCart {

    @Id
    private String email;

    private String name;

    private List<ProductDetails> cartItems;

}
