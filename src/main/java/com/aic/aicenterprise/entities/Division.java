package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.aic.aicenterprise.constants.DBConstants.DIVISIONS;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = DIVISIONS)
public class Division {
    @Id
    private String name;

    private String application;

    private String category;

    private String brand;

    private String description;
}
