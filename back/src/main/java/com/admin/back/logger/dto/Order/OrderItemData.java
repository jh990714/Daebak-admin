package com.admin.back.logger.dto.Order;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class OrderItemData {
    private String message;
    private Long memberId;
    private String id;
    private String orderNumber;
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal amount;
    private String date;

    public OrderItemData(String date, String message, Long memberId, String id, String orderNumber, Long productId, String productName, int quantity, BigDecimal amount) {
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.orderNumber = orderNumber;
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.amount = amount;
        this.date = date;
    }
}
