package com.aic.aicenterprise.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderSummary {
    private long pendingOrders;
    private long acceptedOrders;
    private long dispatchedOrders;
    private long fulfilledOrders;
}
