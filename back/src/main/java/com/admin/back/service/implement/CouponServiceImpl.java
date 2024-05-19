package com.admin.back.service.implement;

import java.util.List;
import java.lang.reflect.Member;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.admin.back.dto.CouponDto;
import com.admin.back.entity.CouponEntity;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;
import com.admin.back.mapper.Mapper;
import com.admin.back.repository.CouponRepository;
import com.admin.back.repository.MemberCouponRepository;
import com.admin.back.service.service.CouponService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final MemberCouponRepository memberCouponRepository;
    private final Mapper mapper;

    @Override
    public List<CouponDto> getCoupons() {
        List<CouponEntity> couponEntities = couponRepository.findAll();
        return couponEntities.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public MemberCouponEntity createMemberCoupon(CouponDto couponDto, MemberEntity memberEntity) {
        Optional<CouponEntity> optionalCouponEntity = couponRepository.findById(couponDto.getCouponId());

        if (optionalCouponEntity.isPresent()) {
            CouponEntity couponEntity = optionalCouponEntity.get();

            MemberCouponEntity memberCoupon = new MemberCouponEntity();
            memberCoupon.setCoupon(couponEntity);
            memberCoupon.setIssueDate(new Date());

            if (couponEntity.getExpirationPeriod() != null) {
                LocalDate currentDate = LocalDate.now();
                LocalDate expirationDate = currentDate.plusMonths(couponEntity.getExpirationPeriod());
                memberCoupon.setValidUntil(Date.from(expirationDate.atStartOfDay(ZoneId.systemDefault()).toInstant()));
            } else {
                memberCoupon.setValidUntil(couponEntity.getValidUntil());
            }

            // MemberEntity를 MemberCouponEntity에 설정합니다.
            memberCoupon.setMember(memberEntity);

            // 여기서 MemberCouponEntity를 저장합니다.
            memberCoupon = memberCouponRepository.save(memberCoupon);

            System.out.println("MemberCouponEntity: " + memberCoupon);

            return memberCoupon;
        } else {
            throw new IllegalArgumentException("Coupon with id " + couponDto.getCouponId() + " not found");
        }
    }


}
