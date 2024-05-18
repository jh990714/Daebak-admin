package com.admin.back.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.admin.back.dto.CouponDto;
import com.admin.back.entity.CouponEntity;
import com.admin.back.mapper.Mapper;
import com.admin.back.repository.CouponRepository;
import com.admin.back.service.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final Mapper mapper;

    @Override
    public List<CouponDto> getCoupons() {
        List<CouponEntity> couponEntities = couponRepository.findAll();
        return couponEntities.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
