package com.aic.aicenterprise.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Product2NotFoundException extends RuntimeException {

    public Product2NotFoundException(String exception) {
        super(exception);
    }

}
