package com.admin.back.service.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.Optional;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.admin.back.dto.CategoryDto;
import com.admin.back.dto.CategoryDto.SubcategoryDTO;
import com.admin.back.entity.CategoryEntity;
import com.admin.back.repository.CategoryRepository;
import com.admin.back.service.service.CategoryService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> getCategories() {
        List<CategoryDto> categoryDTOs = new ArrayList<>();
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        for (CategoryEntity categoryEntity : categoryEntities) {
            if (categoryEntity.getCategoryId() == 1 || !categoryEntity.getSubcategories().isEmpty()) {
                CategoryDto categoryDTO = new CategoryDto();
                categoryDTO.setId(categoryEntity.getCategoryId());
                categoryDTO.setName(categoryEntity.getName());
                List<SubcategoryDTO> subcategoryDTOs = new ArrayList<>();
                for (CategoryEntity subcategoryEntity : categoryEntity.getSubcategories()) {
                    SubcategoryDTO subcategoryDTO = new SubcategoryDTO();
                    subcategoryDTO.setId(subcategoryEntity.getCategoryId());
                    subcategoryDTO.setName(subcategoryEntity.getName());
                    // 필요한 경우 SubcategoryDTO에 추가 정보를 설정합니다.
                    subcategoryDTOs.add(subcategoryDTO);
                }
                categoryDTO.setSubcategories(subcategoryDTOs);
                categoryDTOs.add(categoryDTO);
            }
        }
        return categoryDTOs;
    }

    @Override
    public CategoryDto updateCategories(CategoryDto categoryDto) {
        System.out.println(categoryDto.getId());

        if (categoryDto.getId() == null) {
            newCategory(categoryDto);

            return categoryDto;
        }

        Optional<CategoryEntity> optionalCategoryEntity = categoryRepository.findById(categoryDto.getId());
    
        if (optionalCategoryEntity.isPresent()) {
            CategoryEntity categoryEntity = optionalCategoryEntity.get();

            categoryEntity.setName(categoryDto.getName());

            List<SubcategoryDTO> subcategoryDtos = categoryDto.getSubcategories();
            List<CategoryEntity> subCategoryEntities = categoryRepository.findByParentCategory(categoryEntity);
    
            Map<Long, CategoryEntity> subCategoryEntityMap = subCategoryEntities.stream()
                .collect(Collectors.toMap(CategoryEntity::getCategoryId, Function.identity()));
    
            // Process each subcategory DTO
            for (SubcategoryDTO subcategoryDto : subcategoryDtos) {
                if (subcategoryDto.getId() == null || !subCategoryEntityMap.containsKey(subcategoryDto.getId())) {
                    // Add new subcategory
                    CategoryEntity newSubcategoryEntity = new CategoryEntity();
                    newSubcategoryEntity.setName(subcategoryDto.getName());
                    newSubcategoryEntity.setParentCategory(categoryEntity);
                    categoryRepository.save(newSubcategoryEntity);
                } else {
                    // Update existing subcategory
                    CategoryEntity existingSubcategoryEntity = subCategoryEntityMap.get(subcategoryDto.getId());
                    existingSubcategoryEntity.setName(subcategoryDto.getName());
                    categoryRepository.save(existingSubcategoryEntity);
    
                    // Remove from the map to keep track of subcategories to delete
                    subCategoryEntityMap.remove(subcategoryDto.getId());
                }
            }
    
            // Delete remaining subcategories in the map
            for (CategoryEntity subcategoryEntityToDelete : subCategoryEntityMap.values()) {
                categoryRepository.delete(subcategoryEntityToDelete);
            }
    
            return categoryDto;
        } else {
            throw new IllegalArgumentException("Category with id " + categoryDto.getId() + " not found");
        }
    }

    public CategoryDto newCategory(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setName(categoryDto.getName());
        categoryEntity.setParentCategory(null);

        CategoryEntity parentCategory = categoryRepository.save(categoryEntity);

        List<SubcategoryDTO> subcategoryDtos = categoryDto.getSubcategories();
        for (SubcategoryDTO subcategoryDto : subcategoryDtos) {
            CategoryEntity newSubcategoryEntity = new CategoryEntity();
            newSubcategoryEntity.setName(subcategoryDto.getName());
            newSubcategoryEntity.setParentCategory(parentCategory);
            categoryRepository.save(newSubcategoryEntity);
        }

        return categoryDto;
    }

    @Override
    @Transactional
    public void deleteCategory(Long categoryId) {
        // 카테고리 ID에 해당하는 카테고리 엔터티를 찾습니다.
        CategoryEntity categoryEntity = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        // 해당 카테고리 ID를 부모로 가지는 모든 서브 카테고리를 찾습니다.
        List<CategoryEntity> deleteCategoris = categoryRepository.findByParentCategory(categoryEntity);
        deleteCategoris.add(categoryEntity);

        categoryRepository.deleteAll(deleteCategoris);
    }
    
}
