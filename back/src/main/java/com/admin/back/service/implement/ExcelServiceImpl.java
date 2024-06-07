package com.admin.back.service.implement;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.LogDataContainer;
import com.admin.back.dto.LoginData;
import com.admin.back.dto.OrderData;
import com.admin.back.dto.RegistrationData;
import com.admin.back.service.service.ExcelService;
import com.admin.back.util.LogParser;

import java.io.*;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService {
    private static final String UPDATE_LOG_SHEET_NAME = "UpdateLog";

    @Autowired
    private LogParser logParser;

    @Override
    public Workbook readWorkbook(String filePath) throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            return new XSSFWorkbook();
        }
        FileInputStream fis = new FileInputStream(filePath);
        return new XSSFWorkbook(fis);
    }

    @Override
    public void writeWorkbook(Workbook workbook, String filePath) throws IOException {
        FileOutputStream fos = new FileOutputStream(filePath);
        workbook.write(fos);
        fos.close();
    }

    @Override
    public void appendDataToSheet(Workbook workbook, LogDataContainer logData) {
        Sheet loginSheet = getOrCreateSheet(workbook, "LoginData");
        appendLoginData(loginSheet, logData.getLogins());

        Sheet registrationSheet = getOrCreateSheet(workbook, "RegistrationData");
        appendRegistrationData(registrationSheet, logData.getRegistrations());

        Sheet orderSheet = getOrCreateSheet(workbook, "OrderData");
        appendOrderData(orderSheet, logData.getOrders());

        Sheet cancelSheet = getOrCreateSheet(workbook, "CancelData");
        appendCancelData(cancelSheet, logData.getCancels());
    }

    private Sheet getOrCreateSheet(Workbook workbook, String sheetName) {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {
            sheet = workbook.createSheet(sheetName);
        }
        return sheet;
    }

    private void appendLoginData(Sheet sheet, List<LoginData> logins) {
        int rowNum = sheet.getLastRowNum() + 1;
        for (LoginData login : logins) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(login.getDate());
            row.createCell(1).setCellValue(login.getId());
            row.createCell(2).setCellValue(login.getType());
        }
    }

    private void appendRegistrationData(Sheet sheet, List<RegistrationData> registrations) {
        int rowNum = sheet.getLastRowNum() + 1;
        for (RegistrationData registration : registrations) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(registration.getDate());
            row.createCell(1).setCellValue(registration.getId());
            row.createCell(2).setCellValue(registration.getType());
        }
    }

    private void appendOrderData(Sheet sheet, List<OrderData> orders) {
        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderData order : orders) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(order.getDate());
            row.createCell(1).setCellValue(order.getId());
            row.createCell(2).setCellValue(order.getName());
            row.createCell(3).setCellValue(order.getQuantity());
            row.createCell(4).setCellValue(order.getAmount().doubleValue()); // Assuming each product costs $10
        }
    }

    private void appendCancelData(Sheet sheet, List<OrderData> cancels) {
        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderData cancel : cancels) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(cancel.getDate());
            row.createCell(1).setCellValue(cancel.getId());
            row.createCell(2).setCellValue(cancel.getName());
            row.createCell(3).setCellValue(cancel.getQuantity());
            row.createCell(4).setCellValue(cancel.getAmount().doubleValue()); // Assuming each product costs $10
        }
    }
    private void updateLogSheet(Workbook workbook, String fileName, int lineNumber) {
        Sheet updateLogSheet = getOrCreateSheet(workbook, UPDATE_LOG_SHEET_NAME);
        int rowNum = updateLogSheet.getLastRowNum() + 1;
        Row row = updateLogSheet.createRow(rowNum);
        row.createCell(0).setCellValue(fileName);
        row.createCell(1).setCellValue(lineNumber);
    }

    @Override
    public void processLogs(String logDirectoryPath, String excelFilePath) throws IOException {
        Workbook workbook = readWorkbook(excelFilePath);

        LastProcessedLogInfo lastProcessedLogInfo = getLastProcessedLogInfo(workbook);

        File logDirectory = new File(logDirectoryPath);
        File[] logFiles = logDirectory.listFiles();

        if (logFiles != null) {
            Arrays.sort(logFiles, Comparator.comparingLong(File::lastModified));
            for (File file : logFiles) {
                if (file.getName().compareTo(lastProcessedLogInfo.fileName) > 0) {
                    processLogFile(file, workbook, 0);
                } else if (file.getName().equals(lastProcessedLogInfo.fileName)) {
                    processLogFile(file, workbook, lastProcessedLogInfo.lineNumber);
                }
            }
        }

        writeWorkbook(workbook, excelFilePath);
    }

    private void processLogFile(File file, Workbook workbook, int startLine) throws IOException {
        logParser.reset();
        int lineNumber = logParser.parseLog(file, startLine);
        
       
        LogDataContainer logData = logParser.getLogData();
        appendDataToSheet(workbook, logData);
        updateLogSheet(workbook, file.getName(), lineNumber);
        
    }

    private LastProcessedLogInfo getLastProcessedLogInfo(Workbook workbook) {
        Sheet updateLogSheet = workbook.getSheet(UPDATE_LOG_SHEET_NAME);
        if (updateLogSheet == null || updateLogSheet.getLastRowNum() == 0) {
            return new LastProcessedLogInfo("", 0);
        }

        Row lastRow = updateLogSheet.getRow(updateLogSheet.getLastRowNum());
        String fileName = lastRow.getCell(0).getStringCellValue();
        int lineNumber = (int) lastRow.getCell(1).getNumericCellValue();

        return new LastProcessedLogInfo(fileName, lineNumber);
    }

    private static class LastProcessedLogInfo {
        String fileName;
        int lineNumber;

        LastProcessedLogInfo(String fileName, int lineNumber) {
            this.fileName = fileName;
            this.lineNumber = lineNumber;
        }
    }
}
