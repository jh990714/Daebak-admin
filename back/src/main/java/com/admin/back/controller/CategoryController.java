package com.admin.back.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.CategoryDto;
import com.admin.back.service.service.CategoryService;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    
    @GetMapping
    public ResponseEntity<?> getCategories() {
        List<CategoryDto> categories = categoryService.getCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> updateCategories(@RequestBody CategoryDto categoryDto) {
        CategoryDto categories = categoryService.updateCategories(categoryDto);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
        System.out.println(categoryId);
        categoryService.deleteCategory(categoryId);

        return new ResponseEntity<>(categoryId, HttpStatus.OK);
    }
}
