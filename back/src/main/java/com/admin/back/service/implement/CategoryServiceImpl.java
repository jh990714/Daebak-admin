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
            List<SubcategoryDTO> subcategoryDTOs = new ArrayList<>();

            if (categoryEntity.getParentCategory() == null) {
                CategoryDto categoryDTO = new CategoryDto();
                categoryDTO.setId(categoryEntity.getCategoryId());
                categoryDTO.setName(categoryEntity.getName());
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
                if (subcategoryDto.getName().equals("")) continue;
                System.out.println("name" + subcategoryDto.getName());
                if (subcategoryDto.getId() == null || !subCategoryEntityMap.containsKey(subcategoryDto.getId())) {
                    // Add new subcategory
                    CategoryEntity newSubcategoryEntity = new CategoryEntity();
                    newSubcategoryEntity.setName(subcategoryDto.getName());
                    newSubcategoryEntity.setParentCategory(categoryEntity);
                    categoryRepository.save(newSubcategoryEntity);
                } else {

                    CategoryEntity existingSubcategoryEntity = subCategoryEntityMap.get(subcategoryDto.getId());
                    existingSubcategoryEntity.setName(subcategoryDto.getName());
                    categoryRepository.save(existingSubcategoryEntity);

                    subCategoryEntityMap.remove(subcategoryDto.getId());
                }
            }
    
            // Delete remaining subcategories in the map
            for (CategoryEntity subcategoryEntityToDelete : subCategoryEntityMap.values()) {
                categoryRepository.delete(subcategoryEntityToDelete);
            }
    
            return getCategoryDtoFromEntity(categoryEntity);
        } else {
            throw new IllegalArgumentException("Category with id " + categoryDto.getId() + " not found");
        }
    }

    // CategoryEntity에서 CategoryDto로 변환하는 보조 메서드
    private CategoryDto getCategoryDtoFromEntity(CategoryEntity categoryEntity) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(categoryEntity.getCategoryId());
        categoryDto.setName(categoryEntity.getName());
        List<SubcategoryDTO> subcategoryDTOs = new ArrayList<>();
        for (CategoryEntity subcategoryEntity : categoryEntity.getSubcategories()) {
            SubcategoryDTO subcategoryDTO = new SubcategoryDTO();
            subcategoryDTO.setId(subcategoryEntity.getCategoryId());
            subcategoryDTO.setName(subcategoryEntity.getName());
            subcategoryDTOs.add(subcategoryDTO);
        }
        categoryDto.setSubcategories(subcategoryDTOs);
        return categoryDto;
    }

    public CategoryDto newCategory(CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(categoryDto.getName());
    
        // 새로운 카테고리 저장
        CategoryEntity savedCategoryEntity = categoryRepository.save(categoryEntity);
      
        List<SubcategoryDTO> subcategoryDtos = categoryDto.getSubcategories();
        List<SubcategoryDTO> newSubcategoryDTOs = new ArrayList<>();
    
        // 서브카테고리 추가
        for (SubcategoryDTO subcategoryDto : subcategoryDtos) {
            if (subcategoryDto.getName().equals("")) continue;
            CategoryEntity newSubcategoryEntity = new CategoryEntity();
            newSubcategoryEntity.setName(subcategoryDto.getName());
            newSubcategoryEntity.setParentCategory(savedCategoryEntity);
    
            // 새로운 서브카테고리 저장
            CategoryEntity savedSubcategoryEntity = categoryRepository.save(newSubcategoryEntity);
    
            // 저장된 서브카테고리의 ID와 이름으로 SubcategoryDTO 생성 및 리스트에 추가
            SubcategoryDTO newSubcategoryDTO = new SubcategoryDTO();
            newSubcategoryDTO.setId(savedSubcategoryEntity.getCategoryId());
            newSubcategoryDTO.setName(savedSubcategoryEntity.getName());
            newSubcategoryDTOs.add(newSubcategoryDTO);
        }
    
        // 카테고리의 ID와 서브카테고리 리스트 설정 후 반환
        categoryDto.setId(savedCategoryEntity.getCategoryId());
        categoryDto.setSubcategories(newSubcategoryDTOs);
        
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
