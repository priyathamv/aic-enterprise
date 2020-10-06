package com.aic.aicenterprise.models.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductEnquiryRequest {
    private String name;
    private String email;
    private String phoneNumber;
    private String company;
    private String cas;
    private String productDesc;
    private String address;
    private String city;
    private String zip;
    private String state;
    private String country;
}
