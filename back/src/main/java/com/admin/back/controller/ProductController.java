package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("product")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductService productService;

    @GetMapping("getProducts")
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<ProductDto> productDTOs = productService.getProducts();

        return ResponseEntity.ok().body(productDTOs);
    }

    @PostMapping
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto product) {
        ProductDto updateProductDto = productService.updateProduct(product);
        
        return ResponseEntity.ok().body(updateProductDto);
    }
    
    
}
