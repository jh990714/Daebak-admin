package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.CategoryDto;

public interface CategoryService {

    List<CategoryDto> getCategories();

    CategoryDto updateCategories(CategoryDto categoryDto);

    void deleteCategory(Long categoryId);
    
}
