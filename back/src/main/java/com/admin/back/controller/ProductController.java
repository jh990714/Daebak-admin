package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.admin.back.entity.ProductEntity;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("product")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;

    @GetMapping("getProducts")
    public ResponseEntity<List<ProductEntity>> getProducts() {
        List<ProductEntity> productEntities = productService.getProducts();

        return ResponseEntity.ok().body(productEntities);
    }
    
}
