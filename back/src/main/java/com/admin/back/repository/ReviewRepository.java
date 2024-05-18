package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.ReviewEntity;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {
}
