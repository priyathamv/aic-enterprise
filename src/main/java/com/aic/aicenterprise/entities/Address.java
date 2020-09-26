package com.aic.aicenterprise.entities;

import lombok.*;

@Setter
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String street;
    private String city;
    private String zip;
    private String country;
}
