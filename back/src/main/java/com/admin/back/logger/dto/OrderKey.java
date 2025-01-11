package com.admin.back.logger.dto;

import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderKey {
    private String memberId;
    private String id;
    private String productId;
    private String productName;

    public OrderKey(String memberId, String id, String productId, String productName) {
        this.memberId = memberId;
        this.id = id;
        this.productId = productId;
        this.productName = productName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OrderKey orderKey = (OrderKey) o;
        return Objects.equals(memberId, orderKey.memberId) &&
                Objects.equals(id, orderKey.id) &&
                Objects.equals(productId, orderKey.productId) &&
                Objects.equals(productName, orderKey.productName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, id, productId, productName);
    }
}
