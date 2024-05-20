package com.admin.back.service.implement;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.admin.back.dto.ProductDealDto;
import com.admin.back.dto.ProductDto;
import com.admin.back.entity.ProductDealEntity;
import com.admin.back.entity.ProductEntity;
import com.admin.back.repository.ProductDealRepository;
import com.admin.back.repository.ProductRepository;
import com.admin.back.service.service.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService  {

    private final ProductRepository productRepository;
    private final ProductDealRepository productDealRepository;

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

    @Override
    public List<ProductDealDto> getDealProducts() {
        List<ProductDealEntity> productDealEntities = productDealRepository.findAll();
    
        List<ProductDealDto> productDealDTOs = productDealEntities.stream()
            .map(ProductDealDto::fromEntity)
            .collect(Collectors.toList());

        return productDealDTOs;
    }

    @Override
    public ProductDealDto updateDealProducts(ProductDealDto productDeal) {
        Optional<ProductDealEntity> optionalProductDealEntity= productDealRepository.findById(productDeal.getDealId());

        if (optionalProductDealEntity.isPresent()) {
            ProductDealEntity productDealEntity = optionalProductDealEntity.get();

            productDealEntity.setDealPrice(productDeal.getDealPrice());
            productDealEntity.setStartDate(productDeal.getStartDate());
            productDealEntity.setEndDate(productDeal.getEndDate());

            ProductDealEntity updatedProductDealEntity = productDealRepository.save(productDealEntity);
            
            return ProductDealDto.fromEntity(updatedProductDealEntity);
        } else {
            throw new IllegalArgumentException("Product with ID " + productDeal.getDealId() + " not found.");
        }
    }

    @Override
    public ProductDealDto saveDealProducts(ProductDealDto productDeal) {
        ProductDealEntity newPoductDealEntity = ProductDealDto.toEntity(productDeal);

        Optional<ProductDealEntity> optionalProductDealEntity = productDealRepository.findByProduct(newPoductDealEntity.getProduct());
        
        if (optionalProductDealEntity.isPresent()) {
            productDealRepository.delete(optionalProductDealEntity.get());
        }
        
        ProductDealEntity savedProductDealEntity = productDealRepository.save(newPoductDealEntity);
        return ProductDealDto.fromEntity(savedProductDealEntity);
    }

    @Override
    public ProductDealDto deleteDealProducts(ProductDealDto productDeal) {
        Optional<ProductDealEntity> optionalProductDealEntity = productDealRepository.findById(productDeal.getDealId());

        if (optionalProductDealEntity.isPresent()) {
            productDealRepository.deleteById(productDeal.getDealId());

            return productDeal;
        } else {
            throw new IllegalArgumentException("Deal with ID " + productDeal.getDealId() + " not found.");
        }
    }
    
}
