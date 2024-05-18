package com.admin.back.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberCouponDto {
    private Long id;
    private Date issueDate;
    private Date validUntil;
    private CouponDto coupon;
}
