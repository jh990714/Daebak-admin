package com.admin.back.service.service;

import java.io.IOException;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.dto.LogDataContainer;

public interface ExcelService {
    public Workbook readWorkbook(String filePath) throws IOException;
    public void writeWorkbook(Workbook workbook, String filePath) throws IOException;
    public void appendDataToSheet(Workbook workbook, LogDataContainer logData);
    public void processLogs(String logDirectoryPath, String excelFilePath) throws IOException;

}
