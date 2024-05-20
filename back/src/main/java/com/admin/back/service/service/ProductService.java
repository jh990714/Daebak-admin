package com.admin.back.service.service;

import java.util.List;

import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;

public interface ProductService {
    public List<ProductDto> getProducts();

    public ProductDto updateProduct(ProductDto productDto);

    public List<ProductDealDto> getDealProducts();

    public ProductDealDto updateDealProducts(ProductDealDto productDeal);

    public ProductDealDto saveDealProducts(ProductDealDto productDeal);

    public ProductDealDto deleteDealProducts(ProductDealDto productDeal);
}
