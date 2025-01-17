package com.admin.back.logger.dto.Order;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductStatisticsResponse {
    private List<OrderStatisticsData> productStatistics;
    private double totalAmount;

    public void calculateTotalAmount() {
        // 주문 금액과 취소 금액 차이를 계산하여 totalAmount에 저장
        this.totalAmount = productStatistics.stream()
                .mapToDouble(data -> data.getAmount())
                .sum();
    }
}

