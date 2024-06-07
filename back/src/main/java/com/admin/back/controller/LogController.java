package com.admin.back.controller;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.*;

import com.admin.back.dto.LogDataContainer;
import com.admin.back.dto.LoginData;
import com.admin.back.dto.OrderData;
import com.admin.back.dto.RegistrationData;
import com.admin.back.service.service.ExcelService;
// import com.admin.back.service.service.LogService;

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
    public String loadLogData(@RequestParam String logDirectoryPath, @RequestParam String excelFilePath) {
        try {
            excelService.processLogs(logDirectoryPath, excelFilePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Logs processed successfully!";
    }
}
