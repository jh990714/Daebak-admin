package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductDto> getProducts();

    public ProductDto updateProduct(ProductDto productDto);
}
