package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class OrderData {
    private String id;
    private String name;
    private int quantity;
    private BigDecimal amount;
    private String date;

    public OrderData(String id, String name, int quantity, String date, BigDecimal amount) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.date = date;
        this.amount = amount;
    }
}