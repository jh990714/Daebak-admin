package com.admin.back.dto;

import java.util.Set;

import java.util.Date;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDto {
    private Long memberId;
    private String name;
    private String id;
    private String email;
    private String phone;
    private String address; 
    private BigDecimal points;
    private Date employed;
    private Set<MemberCouponDto> memberCoupons;
}

