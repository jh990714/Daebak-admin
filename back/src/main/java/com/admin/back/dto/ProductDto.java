package com.admin.back.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.admin.back.entity.ProductEntity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductDto {
    private Long productId;
    private Integer category;
    private String name;
    private String imageUrl;
    private Integer stockQuantity;
    private BigDecimal regularPrice;
    private BigDecimal salePrice;
    private BigDecimal shippingCost;
    private String description;
    private Date arrivalDate;
    private Boolean recommended;
    private Integer maxQuantityPerDelivery;

    // Optional: Include methods to convert between entity and DTO
    public static ProductDto fromEntity(ProductEntity productEntity) {
        ProductDto productDto = new ProductDto();
        productDto.setProductId(productEntity.getProductId());
        productDto.setCategory(productEntity.getCategory());
        productDto.setName(productEntity.getName());
        productDto.setImageUrl(productEntity.getImageUrl());
        productDto.setStockQuantity(productEntity.getStockQuantity());
        productDto.setRegularPrice(productEntity.getRegularPrice());
        productDto.setSalePrice(productEntity.getSalePrice());
        productDto.setShippingCost(productEntity.getShippingCost());
        productDto.setDescription(productEntity.getDescription());
        productDto.setArrivalDate(productEntity.getArrivalDate());
        productDto.setRecommended(productEntity.getRecommended());
        productDto.setMaxQuantityPerDelivery(productEntity.getMaxQuantityPerDelivery());
        return productDto;
    }

    public static ProductEntity toEntity(ProductDto productDto) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setProductId(productDto.getProductId());
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
        return productEntity;
    }
}