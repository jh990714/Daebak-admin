package com.admin.back.logger.service.implement;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.LogDataContainer;
import com.admin.back.logger.dto.LogDataErrorContainer;
import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationStatisticsData;
import com.admin.back.logger.dto.Login.LoginData;
import com.admin.back.logger.dto.Login.LoginStatisticsData;
import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Order.OrderStatisticsData;
import com.admin.back.logger.handler.LogErrorParser;
import com.admin.back.logger.handler.LogInfoParser;
import com.admin.back.logger.service.service.CouponLogService;
import com.admin.back.logger.service.service.ExcelService;
import com.admin.back.logger.service.service.LoginLogService;
import com.admin.back.logger.service.service.OrderItemLogService;
import com.admin.back.logger.service.service.OrderLogService;
import com.admin.back.logger.service.service.PointLogService;
import com.admin.back.logger.service.service.ProductLogService;
import com.admin.back.logger.service.service.RegistrationService;
import com.admin.back.logger.service.service.SearchLogService;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import lombok.RequiredArgsConstructor;

import java.io.*;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {

    private final LoginLogService loginLogService;
    private final RegistrationService registrationService;
    private final OrderItemLogService orderItemLogService;
    private final OrderLogService orderLogService;
    private final CouponLogService couponLogService;
    private final PointLogService pointLogService;
    private final ProductLogService productLogService;
    private final SearchLogService searchLogService;

    private final LogInfoParser logInfoParser;
    private final LogErrorParser logErrorParser;

    private final AmazonS3 amazonS3;

    @Value("${log.directory.path}")
    private String saveLogDirectoryPath;

    @Value("${aws.s3.bucket}")
    private String s3BucketName;

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
    public void processLogs(String status) throws IOException {
        String logPrefix = "logs/" + status + "/";
        ListObjectsV2Request listObjectsRequest = new ListObjectsV2Request()
                .withBucketName(s3BucketName)
                .withPrefix(logPrefix);

        ListObjectsV2Result result = amazonS3.listObjectsV2(listObjectsRequest);
        List<S3ObjectSummary> objectSummaries = result.getObjectSummaries();

        for (S3ObjectSummary objectSummary : objectSummaries) {

            String fileName = objectSummary.getKey();
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

            try (S3Object s3Object = amazonS3.getObject(s3BucketName, fileName);
                    InputStream inputStream = s3Object.getObjectContent()) {

                File file = convertInputStreamToFile(inputStream, fileName);

                if (status.equals("info")) {
                    processLogInfos(file, status, fileDateStr);
                } else if (status.equals("error") || status.equals("warn")) {
                    processLogErrors(file, status, fileDateStr);
                }

                amazonS3.deleteObject(s3BucketName, fileName);
            } catch (IOException e) {
                e.printStackTrace(); // Handle error
            }

        }

    }

    // @Override
    // public void processLogs(String status) throws IOException {
    // String folderPath =
    // "C:\\Users\\jang\\Desktop\\da\\daebaksusan\\daebaksusan\\logs";
    // // 로그 디렉토리 경로 생성
    // String logPrefix = folderPath + File.separator + status + "/";
    // File logDirectory = new File(logPrefix);

    // if (!logDirectory.exists() || !logDirectory.isDirectory()) {
    // System.out.println("Directory does not exist: " + logPrefix);
    // return;
    // }

    // // 디렉토리의 모든 파일 불러오기
    // File[] logFiles = logDirectory.listFiles();
    // if (logFiles == null || logFiles.length == 0) {
    // System.out.println("No files found in directory: " + logPrefix);
    // return;
    // }

    // // 각 파일 처리
    // for (File logFile : logFiles) {
    // String fileName = logFile.getName();
    // String fileDateStr = extractDateFromFileName(fileName);

    // if (fileDateStr == null) {
    // continue; // 유효한 날짜가 없는 파일은 건너뜀
    // }

    // try {
    // if (status.equals("info")) {
    // processLogInfos(logFile, status, fileDateStr);
    // } else if (status.equals("error") || status.equals("warn")) {
    // processLogErrors(logFile, status, fileDateStr);
    // }

    // // // 파일 처리 후 삭제
    // // if (logFile.delete()) {
    // // System.out.println("File processed and deleted: " + fileName);
    // // } else {
    // // System.out.println("Failed to delete file: " + fileName);
    // // }
    // } catch (IOException e) {
    // e.printStackTrace(); // 예외 처리
    // }
    // }
    // }

    private File convertInputStreamToFile(InputStream inputStream, String fileName) throws IOException {
        File tempFile = new File(System.getProperty("java.io.tmpdir"), fileName);

        // 디렉토리가 존재하지 않으면 생성
        File parentDir = tempFile.getParentFile();
        if (!parentDir.exists()) {
            parentDir.mkdirs();
        }

        try (FileOutputStream outputStream = new FileOutputStream(tempFile)) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } finally {
            // InputStream을 닫아 S3 연결을 종료
            inputStream.close();
        }

        return tempFile;
    }

    private void processLogInfos(File file, String status, String fileDateStr) throws IOException {
        String savePath = saveLogDirectoryPath + status + "/"; // saveLogDirectoryPath 사용

        String year = fileDateStr.substring(0, 4); // 2025
        String month = fileDateStr.substring(5, 7); // 01
        String yearMonthDirectory = year + "/" + month + "/";

        String combinedLogDirecoryPath = savePath + "origin/" + yearMonthDirectory;
        String excelLogDirectoryPath = savePath + "excel/" + yearMonthDirectory;
        String excelStatisticsDirectoryPath = savePath + "statistics/" + yearMonthDirectory;

        // 디렉토리가 없으면 생성
        File combinedLogDirecory = new File(combinedLogDirecoryPath);
        if (!combinedLogDirecory.exists()) {
            combinedLogDirecory.mkdirs();
        }

        File excelLogDirectory = new File(excelLogDirectoryPath);
        if (!excelLogDirectory.exists()) {
            excelLogDirectory.mkdirs();
        }

        File excelStatisticsDirectory = new File(excelStatisticsDirectoryPath);
        if (!excelStatisticsDirectory.exists()) {
            excelStatisticsDirectory.mkdirs();
        }

        // 엑셀 파일 저장 경로
        String combinedLogFilePath = combinedLogDirecoryPath + "combined_logs_" + fileDateStr + ".log";
        String excelFilePath = excelLogDirectoryPath + "log_" + fileDateStr + ".xlsx";
        String excelMonthlyFilePath = excelLogDirectoryPath + "log_" + fileDateStr.substring(0, 7) + ".xlsx";
        String excelStatisticsFilePath = excelStatisticsDirectoryPath + "log_statistics_" + fileDateStr + ".xlsx";
        String excelMonthlyStatisticsFilePath = excelStatisticsDirectoryPath + "log_statistics_"
                + fileDateStr.substring(0, 7) + ".xlsx";

        File combinedLog = new File(combinedLogFilePath);

        Workbook workbook = readWorkbook(excelFilePath); // 엑셀 파일 읽기
        Workbook workbookMonthly = readWorkbook(excelMonthlyFilePath);
        Workbook workbookStatistics = readWorkbook(excelStatisticsFilePath);
        Workbook workbookMonthlyStatistics = readWorkbook(excelMonthlyStatisticsFilePath);

        // 로그 파일 처리
        processLogFile(file, combinedLog, workbook, workbookMonthly, workbookStatistics, workbookMonthlyStatistics);

        // 파일 저장
        writeWorkbook(workbookMonthly, excelMonthlyFilePath);
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

    private void processLogFile(File file, File combinedLog, Workbook workbook, Workbook workbookMonthly,
            Workbook workbookStatistics, Workbook workbookMonthlyStatistics) throws IOException {

        logInfoParser.parseLog(file, combinedLog);

        LogDataContainer logData = logInfoParser.getLogData();
        appendDataToSheet(workbookMonthly, logData);
        appendStatistics(workbookStatistics, workbookMonthlyStatistics, logData);
    }

    private void processLogErrorsFromFile(File file, File combinedLog, Workbook workbook) throws IOException {
        logErrorParser.parseLog(file, combinedLog);

        LogDataErrorContainer logData = logErrorParser.getLogData();
        appendErrorDataToSheet(workbook, logData);
    }

    private void appendStatistics(Workbook workbook, Workbook workbookMonthlyStatistics, LogDataContainer logData) {
        loginLogService.updateLoginStatistics(workbook, workbookMonthlyStatistics, logData.getLogins(),
                "로그인 횟수 통계");
        registrationService.updateRegistrationStatistics(workbook, workbookMonthlyStatistics,
                logData.getRegistrations(),
                "회원가입 횟수 통계");
        orderItemLogService.updateOrderStatistics(workbook, workbookMonthlyStatistics, logData.getOrderItems(),
                "회원별 주문 항목 통계");
        orderItemLogService.updateOrderStatistics(workbook, workbookMonthlyStatistics, logData.getCancelItems(),
                "회원별 취소 항목 통계");
        orderItemLogService.updateProductStatistics(workbook, workbookMonthlyStatistics, logData.getOrderItems(),
                "상품별 주문 횟수 통계");
        orderItemLogService.updateProductStatistics(workbook, workbookMonthlyStatistics, logData.getCancelItems(),
                "상품별 취소 횟수 통계");
        productLogService.updateProductStatistics(workbook, workbookMonthlyStatistics, logData.getProductClicks(),
                "상품 클릭 통계");
        searchLogService.updateSearchStatistics(workbook, workbookMonthlyStatistics, logData.getSearchs(),
                "검색 통계");
        searchLogService.updateSearchStatistics(workbook, workbookMonthlyStatistics, logData.getCategories(),
                "카테고리 통계");

        for (int i = 0; i < workbook.getSheetAt(0).getRow(0).getPhysicalNumberOfCells(); i++) {
            workbook.getSheetAt(0).autoSizeColumn(i);
        }

    }

    private void appendDataToSheet(Workbook workbook, LogDataContainer logData) {
        loginLogService.appendInfoLoginData(workbook, logData.getLogins(), "로그인");
        registrationService.appendInfoRegistrationData(workbook, logData.getRegistrations(), "회원가입");
        orderItemLogService.appendInfoOrderItemData(workbook, logData.getOrderItems(), "주문 상품 정보");
        orderItemLogService.appendInfoOrderItemData(workbook, logData.getCancelItems(), "취소 상품 정보");
        orderLogService.appendInfoOrderData(workbook, logData.getOrders(), "결제");
        orderLogService.appendInfoOrderData(workbook, logData.getCancels(), "결제 취소");
        couponLogService.appendInfoCouponData(workbook, logData.getCoupns(), "쿠폰");
        pointLogService.appendInfoPointData(workbook, logData.getPoints(), "포인트");
        productLogService.appendInfoProductData(workbook, logData.getProductClicks(), "상품");
        searchLogService.appendInfoSearchData(workbook, logData.getSearchs(), "검색");
        searchLogService.appendInfoSearchData(workbook, logData.getCategories(), "카테고리");

    }

    private void appendErrorDataToSheet(Workbook workbook, LogDataErrorContainer logData) {
        loginLogService.appendErrorLoginErrorData(workbook, logData.getLogins(), "로그인");
        registrationService.appendErrorRegistrationErrorData(workbook, logData.getRegistrations(), "회원가입");
        orderItemLogService.appendErrorOrderItemData(workbook, logData.getCancelItems(), "주문 상품 정보");
        orderItemLogService.appendErrorOrderItemData(workbook, logData.getOrderItems(), "취소 상품 정보");
        orderLogService.appendErrorOrderData(workbook, logData.getOrders(), "결제");
        orderLogService.appendErrorOrderData(workbook, logData.getCancels(), "결제 취소");
        couponLogService.appendErrorCouponData(workbook, logData.getCoupns(), "쿠폰");
        pointLogService.appendErrorPointData(workbook, logData.getPoints(), "포인트");
    }
}
