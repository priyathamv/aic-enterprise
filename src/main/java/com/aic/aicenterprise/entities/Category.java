package com.aic.aicenterprise.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.aic.aicenterprise.constants.DBConstants.CATEGORIES;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = CATEGORIES)
public class Category {
    @Id
    private String name;

    private String application;

    private String description;
}
