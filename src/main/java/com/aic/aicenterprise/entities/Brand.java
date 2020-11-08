package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.aic.aicenterprise.constants.DBConstants.BRANDS;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = BRANDS)
public class Brand {
    @Id
    private String name;

    private String description;
}
