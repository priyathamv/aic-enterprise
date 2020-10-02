package com.aic.aicenterprise.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EmailNotFoundException extends RuntimeException {

    public EmailNotFoundException(String exception) {
        super(exception);
    }

}
