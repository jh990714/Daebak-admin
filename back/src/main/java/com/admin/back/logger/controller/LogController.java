package com.admin.back.logger.controller;

import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationStatisticsData;
import com.admin.back.logger.dto.Login.LoginData;
import com.admin.back.logger.dto.Login.LoginStatisticsData;
import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Order.OrderStatisticsData;
import com.admin.back.logger.dto.Order.ProductStatisticsResponse;
import com.admin.back.logger.service.service.ExcelService;
import com.admin.back.logger.service.service.ProductSalesService;
import com.admin.back.logger.service.service.SalesAmountService;
import com.admin.back.logger.service.service.SalesCountService;
import com.admin.back.logger.service.service.VisitCountService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class LogController {
    // private final LogService logService;
    private final ExcelService excelService;
    private final VisitCountService visitCountService;
    private final SalesAmountService salesAmountService;
    private final SalesCountService salesCountService;
    private final ProductSalesService productSalesService;

    @GetMapping("/load")
    public String loadLogData(@RequestParam String path) {
        try {
            excelService.processLogs(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Logs processed successfully!";
    }

    @GetMapping("/visit-count")
    public ResponseEntity<Integer> getVisitCountForDate(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyyMMdd") Date date) {
        int visitCount = visitCountService.getVisitCountForDate(date);
        return ResponseEntity.ok(visitCount);
    }

    @GetMapping("/sales-amount")
    public ResponseEntity<Integer> getSalesAmountForDate(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyyMMdd") Date date) {
        int salesAmount = salesAmountService.getSalesAmountForDate(date);
        return ResponseEntity.ok(salesAmount);
    }

    @GetMapping("/sales-count")
    public ResponseEntity<Integer> getSalesCountForDate(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyyMMdd") Date date) {
        int salesCount = salesCountService.getSalesCountForDate(date);
        return ResponseEntity.ok(salesCount);
    }

    @GetMapping("/product-sales")
    public ResponseEntity<ProductStatisticsResponse> getProductStatisticsForDateRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyyMM") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyyMM") Date endDate) {
        try {
            List<OrderStatisticsData> productStatistics = productSalesService.getProductSalesInRange(startDate, endDate);
    
            ProductStatisticsResponse response = new ProductStatisticsResponse();
            response.setProductStatistics(productStatistics);
    
            response.calculateTotalAmount();
    
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // 에러 발생 시 로그 출력하고 500 상태 반환
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    

}
