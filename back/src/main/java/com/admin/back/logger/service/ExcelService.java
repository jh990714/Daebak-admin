package com.admin.back.logger.service;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.LoginStatisticsData;
import com.admin.back.logger.dto.OrderStatisticsData;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationStatisticsData;

public interface ExcelService {
    public Workbook readWorkbook(String filePath) throws IOException;
    public void writeWorkbook(Workbook workbook, String filePath) throws IOException;
    public void appendDataToSheet(Workbook workbook, LogDataContainer logData);
    public void processLogs(String logDirectoryPath, String path) throws IOException;
    public List<OrderStatisticsData> getOrderStatisticsData(String excelStatisticsFilePath);
    public List<LoginData> getLoginData(String excelFilePath);
    public List<RegistrationData> getRegistrationData(String excelFilePath);
    public List<LoginStatisticsData> getLoginStatisticsData(String excelStatisticsFilePath);
    public List<RegistrationStatisticsData> getRegistrationStatisticsData(String excelStatisticsFilePath);
}
