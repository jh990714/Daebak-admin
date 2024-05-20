package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



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

    @GetMapping("deal")
    public ResponseEntity<List<ProductDealDto>> getDealProducts() {
        List<ProductDealDto> productDealDTOs = productService.getDealProducts();

        return ResponseEntity.ok().body(productDealDTOs);
    }

    @PostMapping
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto product) {
        ProductDto updateProductDto = productService.updateProduct(product);
        
        return ResponseEntity.ok().body(updateProductDto);
    }

    @PostMapping("deal")
    public ResponseEntity<ProductDealDto> updateDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto updateProductDeaDto = productService.updateDealProducts(productDeal);
        
        return ResponseEntity.ok().body(updateProductDeaDto);
    }
    
    @PutMapping("deal")
    public ResponseEntity<ProductDealDto> saveDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto saveProductDealDto = productService.saveDealProducts(productDeal);
        
        return ResponseEntity.ok().body(saveProductDealDto);
    }

     
    @PostMapping("deal/delete")
    public ResponseEntity<ProductDealDto> deleteDealProducts(@RequestBody ProductDealDto productDeal) {
        ProductDealDto deleteProductDealDto = productService.deleteDealProducts(productDeal);
        
        return ResponseEntity.ok().body(deleteProductDealDto);
    }
    
}
