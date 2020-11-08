package com.aic.aicenterprise.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.aic.aicenterprise.constants.DBConstants.SUBSCRIBERS;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = SUBSCRIBERS)
public class Subscriber {
    @Id
    private String email;
}
