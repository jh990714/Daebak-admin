package com.admin.back.service.implement;

import java.util.List;

import org.springframework.stereotype.Service;

import com.admin.back.entity.ProductEntity;
import com.admin.back.repository.ProductRepository;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService  {

    private final ProductRepository productRepository;

    @Override
    public List<ProductEntity> getProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();
        
        return productEntities;
    }
    
}
