package com.aic.aicenterprise.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AnalyticalProductNotFoundException extends RuntimeException {

    public AnalyticalProductNotFoundException(String exception) {
        super(exception);
    }

}
