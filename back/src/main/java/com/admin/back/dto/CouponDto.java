package com.admin.back.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CouponDto {
    private Long couponId;
    private String couponCode;
    private String couponName;
    private BigDecimal discount;
    private Date validFrom;
    private Date validUntil;
    private BigDecimal minimumOrderAmount;
    private Integer expirationPeriod;
}
