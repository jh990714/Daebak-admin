package com.admin.back.logger.handler;

import org.springframework.stereotype.Component;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.SearchData;
import com.admin.back.logger.dto.Coupon.CouponData;
import com.admin.back.logger.dto.Login.LoginData;
import com.admin.back.logger.dto.Order.OrderData;
import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Point.PointData;
import com.admin.back.logger.dto.Product.ProductData;
import com.admin.back.logger.service.service.CouponLogService;
import com.admin.back.logger.service.service.LoginLogService;
import com.admin.back.logger.service.service.OrderItemLogService;
import com.admin.back.logger.service.service.OrderLogService;
import com.admin.back.logger.service.service.PointLogService;
import com.admin.back.logger.service.service.ProductLogService;
import com.admin.back.logger.service.service.RegistrationService;
import com.admin.back.logger.service.service.SearchLogService;

import lombok.RequiredArgsConstructor;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LogInfoParser {
    private LogDataContainer dataContainer = new LogDataContainer();
    private final LoginLogService loginLogService;
    private final RegistrationService registrationService;
    private final OrderItemLogService orderItemLogService;
    private final OrderLogService orderLogService;
    private final CouponLogService couponLogService;
    private final PointLogService pointLogService;
    private final ProductLogService productLogService;
    private final SearchLogService searchLogService;

    public void reset() {
        dataContainer = new LogDataContainer();
    }

    public int parseLog(File file, File combinedLog) throws IOException {
        reset();
    
        FileReader fileReader = new FileReader(file);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        BufferedWriter writer = new BufferedWriter(new FileWriter(combinedLog, true)); // 파일을 이어쓰기 모드로 열기
        String line;
        int lineNumber = 0;
        try {
            while ((line = bufferedReader.readLine()) != null) {
                lineNumber++;
    
                parseLogLine(line);
    
                // 파일에 내용을 이어서 작성
                writer.write(line);
                writer.newLine(); // 새로운 줄로 이동
            }
    
            return lineNumber;
        } finally {
            bufferedReader.close();
            writer.close(); // 파일 닫기
        }
    }

    private void parseLogLine(String logMessage) {
        LoginData loginData = loginLogService.find(logMessage, "Login");
    
        if (loginData != null) {
            dataContainer.getLogins().add(loginData);
            return;
        }

        RegistrationData registrationData = registrationService.find(logMessage, "Register");
    
        if (registrationData != null) {
            dataContainer.getRegistrations().add(registrationData);
            return;
        }

        OrderItemData orderItemData = orderItemLogService.findInfo(logMessage, "Order Item");
    
        if (orderItemData != null) {
            dataContainer.getOrderItems().add(orderItemData);
            return;
        }

        OrderItemData cancelItemData = orderItemLogService.findInfo(logMessage, "Cancel Item");
    
        if (cancelItemData != null) {
            dataContainer.getCancelItems().add(cancelItemData);
            return;
        }

        OrderData orderData = orderLogService.find(logMessage, "Order");
    
        if (orderData != null) {
            dataContainer.getOrders().add(orderData);
            return;
        }

        OrderData cancelData = orderLogService.find(logMessage, "Cancel");
    
        if (cancelData != null) {
            dataContainer.getCancels().add(cancelData);
            return;
        }

        CouponData couponData = couponLogService.findInfo(logMessage, "Coupon");
    
        if (couponData != null) {
            dataContainer.getCoupns().add(couponData);
            return;
        }

        PointData pointData = pointLogService.findInfo(logMessage, "Point");
    
        if (pointData != null) {
            dataContainer.getPoints().add(pointData);
            return;
        }

        ProductData productData = productLogService.findInfo(logMessage, "Product");
    
        if (productData != null) {
            dataContainer.getProductClicks().add(productData);
            return;
        }

        SearchData searchData = searchLogService.findInfo(logMessage, "Search");
    
        if (searchData != null) {
            dataContainer.getSearchs().add(searchData);
            return;
        }

        SearchData categoryData = searchLogService.findInfo(logMessage, "Category");
    
        if (categoryData != null) {
            dataContainer.getCategories().add(categoryData);
            return;
        }
    }

    public LogDataContainer getLogData() {
        return dataContainer;
    }
}
