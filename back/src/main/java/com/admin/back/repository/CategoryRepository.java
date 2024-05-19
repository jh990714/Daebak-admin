package com.admin.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.admin.back.entity.CategoryEntity;


public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    List<CategoryEntity> findByParentCategory(CategoryEntity categoryEntity);
}