package com.admin.back.logger.implement;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.LogDataErrorContainer;
import com.admin.back.logger.dto.LoginData;
import com.admin.back.logger.dto.LoginStatisticsData;
import com.admin.back.logger.dto.OrderItemData;
import com.admin.back.logger.dto.OrderStatisticsData;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationStatisticsData;
import com.admin.back.logger.handler.LogErrorParser;
import com.admin.back.logger.handler.LogInfoParser;
import com.admin.back.logger.service.CouponLogService;
import com.admin.back.logger.service.ExcelService;
import com.admin.back.logger.service.LoginLogService;
import com.admin.back.logger.service.OrderItemLogService;
import com.admin.back.logger.service.OrderLogService;
import com.admin.back.logger.service.PointLogService;
import com.admin.back.logger.service.ProductLogService;
import com.admin.back.logger.service.SearchLogService;

import lombok.RequiredArgsConstructor;

import java.io.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {;

    private final LoginLogService loginLogService;
    private final OrderItemLogService orderItemLogService;
    private final OrderLogService orderLogService;
    private final CouponLogService couponLogService;
    private final PointLogService pointLogService;
    private final ProductLogService productLogService;
    private final SearchLogService searchLogService;

    private final LogInfoParser logInfoParser;
    private final LogErrorParser logErrorParser;

    @Value("${log.directory.path}")
    private String saveLogDirectoryPath;

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
        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            workbook.write(fos);
        } finally {
            workbook.close();
        }
    }


    @Override
    public void processLogs(String logDirectoryPath, String status) throws IOException {
        System.out.println(status);
        File logDirectory = new File(logDirectoryPath);
        File[] logFiles = logDirectory.listFiles();

        if (logFiles != null) {
            Arrays.sort(logFiles, Comparator.comparingLong(File::lastModified));
            for (File file : logFiles) {
                String fileName = file.getName();
                System.out.println(fileName);
                String fileDateStr = extractDateFromFileName(fileName);

                if (fileDateStr == null) {
                    continue;
                }
                // String directoryDateStr = fileDateStr.substring(0, 7);
                String savePath = saveLogDirectoryPath + status + "/";
                File saveLogDirectory = new File(savePath);
                if (!saveLogDirectory.exists()) {
                    saveLogDirectory.mkdirs(); // 디렉토리 생성
                }

                if (status.equals("info")) {
                    processLogInfos(file, status, fileDateStr);
                } else if (status.equals("error") || status.equals("warn")) {
                    processLogErrors(file, status, fileDateStr);
                }
               
            }
        }
    }
    private void processLogInfos(File file, String status, String fileDateStr) throws IOException {
        String savePath = saveLogDirectoryPath + status + "/";

        String combinedLogDirecoryPath = savePath + "origin/";
        String excelLogDirectoryPath = savePath + "excel/";
        String excelStatisticsDirectoryPath = savePath + "statistics/";

        File combinedLogDirecory = new File(combinedLogDirecoryPath);
        if (!combinedLogDirecory.exists()) {

            combinedLogDirecory.mkdirs(); // 디렉토리 생성
        }


        File excelLogDirectory = new File(excelLogDirectoryPath);
        if (!excelLogDirectory.exists()) {

            excelLogDirectory.mkdirs(); // 디렉토리 생성
        }

        File excelStatisticsDirectory = new File(excelStatisticsDirectoryPath);
        if (!excelStatisticsDirectory.exists()) {
            excelStatisticsDirectory.mkdirs(); // 디렉토리 생성
        }

        String combinedLogFilePath = combinedLogDirecoryPath + "combined_logs_" + fileDateStr + ".log";
        String excelFilePath = excelLogDirectoryPath + "log_" + fileDateStr + ".xlsx";
        String excelStatisticsFilePath = excelStatisticsDirectoryPath + "log_statistics_" + fileDateStr + ".xlsx";
        String excelMonthlyStatisticsFilePath = excelStatisticsDirectoryPath + "log_statistics_" + fileDateStr.substring(0, 7) + ".xlsx";

        File combinedLog = new File(combinedLogFilePath);

        Workbook workbook = readWorkbook(excelFilePath);
        Workbook workbookStatistics = readWorkbook(excelStatisticsFilePath);
        Workbook workbookMonthlyStatistics = readWorkbook(excelMonthlyStatisticsFilePath);

        processLogFile(file, combinedLog, workbook, workbookStatistics, workbookMonthlyStatistics, 0);

        writeWorkbook(workbook, excelFilePath);
        writeWorkbook(workbookStatistics, excelStatisticsFilePath);
        writeWorkbook(workbookMonthlyStatistics, excelMonthlyStatisticsFilePath);
    }

    private void processLogErrors(File file, String status, String fileDateStr) throws IOException {
        String savePath = saveLogDirectoryPath + status + "/";
        
        String combinedLogDirecoryPath = savePath + "origin/";
        String excelLogDirectoryPath = savePath + "excel/";

        
        File combinedLogDirecory = new File(combinedLogDirecoryPath);
        if (!combinedLogDirecory.exists()) {
            combinedLogDirecory.mkdirs(); // 디렉토리 생성
        }

        File excelLogDirectory = new File(excelLogDirectoryPath);
        if (!excelLogDirectory.exists()) {
            excelLogDirectory.mkdirs(); // 디렉토리 생성
        }

        String combinedLogFilePath = combinedLogDirecoryPath + "combined_logs_" + fileDateStr + ".log";
        String excelFilePath = excelLogDirectoryPath + "log_" + fileDateStr + ".xlsx";

        File combinedLog = new File(combinedLogFilePath);

        Workbook workbook = readWorkbook(excelFilePath);

        // 오류 로그를 처리하는 메서드 호출
        processLogErrorsFromFile(file, combinedLog, workbook);

        writeWorkbook(workbook, excelFilePath);
    }


    private String extractDateFromFileName(String fileName) {
        // Assuming the date format in the filename is yyyy-MM-dd-HH
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd-HH");
        try {
            String[] parts = fileName.split("\\.");
            if (parts.length > 1) {
                String datePart = parts[1]; // Assuming the date part is in the second segment
                Date date = dateFormat.parse(datePart);
                return new SimpleDateFormat("yyyy-MM-dd").format(date); // Adjust date format as needed
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void processLogFile(File file, File combinedLog, Workbook workbook, Workbook workbookStatistics, Workbook workbookMonthlyStatistics,
            int startLine)
            throws IOException {

        logInfoParser.parseLog(file, combinedLog);

        LogDataContainer logData = logInfoParser.getLogData();
        appendDataToSheet(workbook, logData);
        appendStatistics(workbookStatistics, workbookMonthlyStatistics, logData);
    }

    private void processLogErrorsFromFile(File file, File combinedLog, Workbook workbook) throws IOException {
        logErrorParser.parseLog(file, combinedLog);

        LogDataErrorContainer logData = logErrorParser.getLogData();
        appendErrorDataToSheet(workbook, logData);
    }

    private void appendStatistics(Workbook workbook, Workbook workbookMonthlyStatistics, LogDataContainer logData) {
        loginLogService.updateLoginStatistics(workbook, workbookMonthlyStatistics, logData.getLogins(), "LoginStatistics");
        loginLogService.updateLoginStatistics(workbook, workbookMonthlyStatistics, logData.getRegistrations(), "RegistrationsStatistics");
        orderItemLogService.updateOrderStatistics(workbook, workbookMonthlyStatistics, logData.getOrderItems(), "OrderItemStatistics");
        orderItemLogService.updateOrderStatistics(workbook, workbookMonthlyStatistics, logData.getCancelItems(), "CancelItemStatistics");
        productLogService.updateProductStatistics(workbook, workbookMonthlyStatistics, logData.getProductClicks(), "ProductClickStatistics");
        searchLogService.updateSearchStatistics(workbook, workbookMonthlyStatistics, logData.getSearchs(), "SearchStatistics");
        searchLogService.updateSearchStatistics(workbook, workbookMonthlyStatistics, logData.getCategories(), "CategoryStatistics");
    }

    @Override
    public void appendDataToSheet(Workbook workbook, LogDataContainer logData) {
        loginLogService.appendInfoLoginData(workbook, logData.getLogins(), "LoginData");
        loginLogService.appendInfoLoginData(workbook, logData.getRegistrations(), "RegistrationsData");
        orderItemLogService.appendInfoOrderItemData(workbook, logData.getOrderItems(), "OrderItemData");
        orderItemLogService.appendInfoOrderItemData(workbook, logData.getCancelItems(), "CancelItemData");
        orderLogService.appendInfoOrderData(workbook, logData.getOrders(), "OrderData");
        orderLogService.appendInfoOrderData(workbook, logData.getCancels(), "CancelData");
        couponLogService.appendInfoCouponData(workbook, logData.getCoupns(), "CouponData");
        pointLogService.appendInfoPointData(workbook, logData.getPoints(), "PointData");
        productLogService.appendInfoProductData(workbook, logData.getProductClicks(), "ProductData");
        searchLogService.appendInfoSearchData(workbook, logData.getSearchs(), "SearchData");
        searchLogService.appendInfoSearchData(workbook, logData.getCategories(), "CategoryData");
    }

    public void appendErrorDataToSheet(Workbook workbook, LogDataErrorContainer logData) {
        loginLogService.appendErrorLoginErrorData(workbook, logData.getLogins(), "LoginData");
        loginLogService.appendErrorLoginErrorData(workbook, logData.getRegistrations(), "RegistrationsData");
        orderItemLogService.appendErrorOrderItemData(workbook, logData.getCancelItems(), "CancelItemData");
        orderItemLogService.appendErrorOrderItemData(workbook, logData.getOrderItems(), "OrderItemData");
        orderLogService.appendErrorOrderData(workbook, logData.getOrders(), "OrderData");
        orderLogService.appendErrorOrderData(workbook, logData.getCancels(), "CancelData");
        couponLogService.appendErrorCouponData(workbook, logData.getCoupns(), "CouponData");
        pointLogService.appendErrorPointData(workbook, logData.getPoints(), "PointData");
    }
}
