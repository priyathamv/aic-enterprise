package com.aic.aicenterprise.entities;

import com.aic.aicenterprise.models.OrderStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

import static com.aic.aicenterprise.constants.DBConstants.ORDERS;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = ORDERS)
public class Order {
    @Id
    private String id;

    private String email;

    private String name;

    private OrderStatus orderStatus;

    private List<ProductDetails> productList;

    private Date acceptedTs;

    private Date dispatchedTs;

    private Date fulfilledTs;

    private Date createTs;
}
