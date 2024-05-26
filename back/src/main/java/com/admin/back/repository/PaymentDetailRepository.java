package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.admin.back.entity.PaymentDetailEntity;

@Repository
public interface PaymentDetailRepository extends JpaRepository<PaymentDetailEntity, Integer> {
}