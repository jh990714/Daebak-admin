package com.admin.back.logger.dto.Product;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductSalesStatistics {
    private String productId;
    private String productName;
    private int totalQuantity;
    private BigDecimal totalAmount;

    public ProductSalesStatistics(String productId, String productName) {
        this.productId = productId;
        this.productName = productName;
        this.totalQuantity = 0;
        this.totalAmount = BigDecimal.ZERO;
    }

    public void incrementQuantity(int quantity) {
        this.totalQuantity += quantity;
    }

    public void addAmount(BigDecimal amount) {
        this.totalAmount = this.totalAmount.add(amount);
    }

}
