package com.admin.back.service.implement;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductEntity;
import com.admin.back.repository.ProductRepository;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService  {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDto> getProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();

        List<ProductDto> productDTOs = productEntities.stream()
            .map(ProductDto::fromEntity)
            .collect(Collectors.toList());

        return productDTOs;
    }

    public ProductDto updateProduct(ProductDto productDto) {
        Optional<ProductEntity> optionalProductEntity = productRepository.findById(productDto.getProductId());

        if (optionalProductEntity.isPresent()) {
            ProductEntity productEntity = optionalProductEntity.get();

            productEntity.setCategory(productDto.getCategory());
            productEntity.setName(productDto.getName());
            productEntity.setImageUrl(productDto.getImageUrl());
            productEntity.setStockQuantity(productDto.getStockQuantity());
            productEntity.setRegularPrice(productDto.getRegularPrice());
            productEntity.setSalePrice(productDto.getSalePrice());
            productEntity.setShippingCost(productDto.getShippingCost());
            productEntity.setDescription(productDto.getDescription());
            productEntity.setArrivalDate(productDto.getArrivalDate());
            productEntity.setRecommended(productDto.getRecommended());
            productEntity.setMaxQuantityPerDelivery(productDto.getMaxQuantityPerDelivery());

            ProductEntity updatedProductEntity = productRepository.save(productEntity);

            return ProductDto.fromEntity(updatedProductEntity);
        } else {
            throw new IllegalArgumentException("Product with ID " + productDto.getProductId() + " not found.");
        }
    }
    
}
