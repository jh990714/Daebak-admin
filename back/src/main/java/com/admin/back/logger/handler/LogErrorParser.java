package com.admin.back.logger.handler;

import org.springframework.stereotype.Component;

import com.admin.back.logger.dto.LogDataErrorContainer;
import com.admin.back.logger.dto.RegistrationErrorData;
import com.admin.back.logger.dto.Coupon.CouponErrorData;
import com.admin.back.logger.dto.Login.LoginData;
import com.admin.back.logger.dto.Login.LoginErrorData;
import com.admin.back.logger.dto.Order.OrderData;
import com.admin.back.logger.dto.Order.OrderErrorData;
import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Order.OrderItemErrorData;
import com.admin.back.logger.dto.Point.PointErrorData;
import com.admin.back.logger.service.service.CouponLogService;
import com.admin.back.logger.service.service.LoginLogService;
import com.admin.back.logger.service.service.OrderItemLogService;
import com.admin.back.logger.service.service.OrderLogService;
import com.admin.back.logger.service.service.PointLogService;
import com.admin.back.logger.service.service.RegistrationService;

import lombok.RequiredArgsConstructor;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LogErrorParser {

    private LogDataErrorContainer logDataErrorContainer = new LogDataErrorContainer();

    private final LoginLogService loginLogService;
    private final RegistrationService registrationService;
    private final OrderItemLogService orderItemLogService;
    private final OrderLogService orderLogService;
    private final CouponLogService couponLogService;
    private final PointLogService pointLogService;

    private void reset() {
        logDataErrorContainer = new LogDataErrorContainer();
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
        LoginErrorData loginErrorData = loginLogService.findError(logMessage, "Login");
        
        if (loginErrorData != null) {
            logDataErrorContainer.getLogins().add(loginErrorData);
            return;
        }

        RegistrationErrorData registrationErrorData = registrationService.findError(logMessage, "Register");
        
        if (registrationErrorData != null) {
            logDataErrorContainer.getRegistrations().add(registrationErrorData);
            return;
        }

        OrderItemErrorData orderItemErrorData = orderItemLogService.findError(logMessage, "Order Item");

        if (orderItemErrorData != null) {
            logDataErrorContainer.getOrderItems().add(orderItemErrorData);
            return;
        }

        OrderItemErrorData cancelItemErrorData = orderItemLogService.findError(logMessage, "Cancel Item");

        if (cancelItemErrorData != null) {
            logDataErrorContainer.getCancelItems().add(cancelItemErrorData);
            return;
        }

        
        OrderErrorData orderErrorData = orderLogService.findError(logMessage, "Order");
    
        if (orderErrorData != null) {
            logDataErrorContainer.getOrders().add(orderErrorData);
            return;
        }

        OrderErrorData cancelErrorData = orderLogService.findError(logMessage, "Cancel");
    
        if (cancelErrorData != null) {
            logDataErrorContainer.getCancels().add(cancelErrorData);
            return;
        }

        
        CouponErrorData couponErrorData = couponLogService.findError(logMessage, "Point");
    
        if (couponErrorData != null) {
            logDataErrorContainer.getCoupns().add(couponErrorData);
            return;
        }

        PointErrorData pointErrorData = pointLogService.findError(logMessage, "Point");
    
        if (pointErrorData != null) {
            logDataErrorContainer.getPoints().add(pointErrorData);
            return;
        }
    }

    public LogDataErrorContainer getLogData() {
        return logDataErrorContainer;
    }
}
