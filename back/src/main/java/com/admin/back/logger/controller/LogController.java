package com.admin.back.logger.controller;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.*;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.LoginStatisticsData;
import com.admin.back.logger.dto.OrderItemData;
import com.admin.back.logger.dto.OrderStatisticsData;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationStatisticsData;
import com.admin.back.logger.service.ExcelService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class LogController {
    // private final LogService logService;
    private final ExcelService excelService;

    @GetMapping("/load")
    public String loadLogData(@RequestParam String logDirectoryPath, @RequestParam String path) {
        try {
            excelService.processLogs(logDirectoryPath, path);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Logs processed successfully!";
    }

    @GetMapping("/loginData")
    public List<LoginData> loginData(@RequestParam String excelFilePath) {
        return excelService.getLoginData(excelFilePath);
    }

    @GetMapping("/registrationData")
    public List<RegistrationData> registrationData(@RequestParam String excelFilePath) {
        return excelService.getRegistrationData(excelFilePath);
    }

    @GetMapping("/loginStatistics")
    public List<LoginStatisticsData> loginStatisticsData(@RequestParam String excelStatisticsFilePath) {
        return excelService.getLoginStatisticsData(excelStatisticsFilePath);
    }

    @GetMapping("/registrationStatistics")
    public List<RegistrationStatisticsData> registrationStatisticsData(@RequestParam String excelStatisticsFilePath) {
        return excelService.getRegistrationStatisticsData(excelStatisticsFilePath);
    }

    @GetMapping("/orderStatistics")
    public List<OrderStatisticsData> orderStatisticsData(@RequestParam String excelStatisticsFilePath) {
        return excelService.getOrderStatisticsData(excelStatisticsFilePath);
    }
}
