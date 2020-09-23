package com.aic.aicenterprise.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Builder
@Document(collection = "orders")
public class Order {
    private String email;
    private String name;
    private List<ProductDetails> productList;
    private Date createTs;
}
