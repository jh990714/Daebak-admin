package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.PaymentDetailDto;
import com.admin.back.entity.PaymentDetailEntity;
import com.admin.back.repository.PaymentDetailRepository;
import com.admin.back.service.service.PaymentDetailService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentDetailServiceImpl implements PaymentDetailService {

    @Autowired
    private PaymentDetailRepository paymentDetailRepository;

    @Override
    public List<PaymentDetailDto> getAllPaymentDetails() {
        List<PaymentDetailEntity> paymentDetails = paymentDetailRepository.findAll();
        return paymentDetails.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private PaymentDetailDto convertToDTO(PaymentDetailEntity paymentDetail) {
        PaymentDetailDto dto = new PaymentDetailDto();
        dto.setPaymentDetailId(paymentDetail.getPaymentDetailId());

        if (paymentDetail.getMemberId() == null) {
            dto.setMemberName("비회원");
            dto.setId("비회원");
        } else if (paymentDetail.getMember() == null) {
            dto.setMemberName("탈퇴회원");
            dto.setId("탈퇴회원");
        } else {
            dto.setMemberName(paymentDetail.getMember().getName());
            dto.setId(paymentDetail.getMember().getId());
        }

        dto.setImpUid(paymentDetail.getImpUid());
        dto.setOrderNumber(paymentDetail.getOrderNumber());
        dto.setOrderDate(paymentDetail.getOrderDate());
        dto.setCancel(paymentDetail.isCancel());
        dto.setTrackingNumber(paymentDetail.getTrackingNumber());
        return dto;
    }
}