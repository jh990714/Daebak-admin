package com.admin.back.logger.service.service;

import java.util.Date;
import java.util.List;

import com.admin.back.logger.dto.Order.OrderStatisticsData;

public interface ProductSalesService {

    List<OrderStatisticsData> getProductSales(Date date);
    
}
