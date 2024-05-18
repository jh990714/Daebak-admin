package com.admin.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.CouponDto;
import com.admin.back.service.service.CouponService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("coupon")
@RequiredArgsConstructor
public class CouponController {
    private final CouponService couponService;

    @GetMapping("all")
    public ResponseEntity<?> getCoupons() {
        List<CouponDto> couponDtos = couponService.getCoupons();
        return ResponseEntity.ok().body(couponDtos);
    }
}
