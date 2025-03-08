package com.admin.back.logger.dto.Order;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderStatisticsData {
    private Long productId;
    private String productName;
    private int quantity;
    private double amount;
    private String imageUrl;


    public OrderStatisticsData(Long productId, String productName, int quantity, double amount) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.amount = amount;
    }

    public OrderStatisticsData() {
        //TODO Auto-generated constructor stub
    }
}