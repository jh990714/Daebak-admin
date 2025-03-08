package com.admin.back.logger.dto.Order;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderStatistics {
    private int quantity = 0;
    private BigDecimal amount = BigDecimal.ZERO;

    public void incrementCount(int quantity) {
        this.quantity += quantity;
    }

    public void addAmount(BigDecimal orderAmount) {
        this.amount = this.amount.add(orderAmount);
    }
}
