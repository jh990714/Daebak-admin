package com.admin.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.admin.back.entity.AdEntity;

@Repository
public interface AdRepository extends JpaRepository<AdEntity, Long> {

}
