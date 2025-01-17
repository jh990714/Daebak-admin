package com.admin.back.logger.service.implement;

import java.util.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.Login.LogKey;
import com.admin.back.logger.dto.Login.LoginData;
import com.admin.back.logger.dto.Login.LoginErrorData;
import com.admin.back.logger.service.service.LoginLogService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class LoginLogServiceImpl implements LoginLogService {
    private String[] loginLogHeaders = { "Date", "Message", "Member ID", "ID", "Type" };
    private String[] loginErrorLogHeaders = {"Message", "ID", "Type" };
    private String[] loginStatisticsHeaders = {"Member ID", "ID", "Type", "Count" };

    private Pattern createLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), MemberId: (.*), ID: (.*), Type: (.*)",
                messageIdentifier);
        return Pattern.compile(patternString);
    }

    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), ID: (.*), Type: (.*)",
                messageIdentifier);
        return Pattern.compile(patternString);
    }

    private Sheet getOrCreateSheet(Workbook workbook, String sheetName, String[] headers) {
        Sheet sheet = workbook.getSheet(sheetName);
        if (sheet == null) {

            sheet = workbook.createSheet(sheetName);
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
            }
        }
        return sheet;
    }

    @Override
    public void appendInfoLoginData(Workbook workbook, List<LoginData> logins, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, loginLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (LoginData login : logins) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(login.getDate());
            row.createCell(1).setCellValue(login.getMessage());
            row.createCell(2).setCellValue(login.getMemberId().longValue());
            row.createCell(3).setCellValue(login.getId());
            row.createCell(4).setCellValue(login.getType());

        }
    }

    @Override
    public void updateLoginStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<LoginData> logins,
            String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, loginStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, loginStatisticsHeaders);

        // 일별 통계와 월별 통계 각각 처리
        Map<LogKey, Integer> dailyGroupedCounts = calculateGroupedStatistics(logins);
        Map<LogKey, Integer> monthlyGroupedCounts = calculateGroupedStatistics(logins);

        updateSheetWithGroupedCounts(dailySheet, dailyGroupedCounts);
        updateSheetWithGroupedCounts(monthlySheet, monthlyGroupedCounts);
    }

    private Map<LogKey, Integer> calculateGroupedStatistics(List<LoginData> logins) {
        Map<LogKey, Integer> groupedCounts = new HashMap<>();

        for (LoginData login : logins) {
            LogKey key = new LogKey(
                    login.getMemberId(),
                    login.getId(),
                    login.getType());

            groupedCounts.merge(key, 1, Integer::sum);
        }

        return groupedCounts;
    }

    private void updateSheetWithGroupedCounts(Sheet sheet, Map<LogKey, Integer> groupedCounts) {
        Map<LogKey, Row> existingRowsMap = new HashMap<>();

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            LogKey key = new LogKey(
                (long) row.getCell(0).getNumericCellValue(),
                row.getCell(1).getStringCellValue(),
                row.getCell(2).getStringCellValue()
            );

            existingRowsMap.put(key, row);

        }

        // 그룹화된 카운트를 시트에 업데이트
        int rowNum = sheet.getLastRowNum() + 1;

        for (Map.Entry<LogKey, Integer> entry : groupedCounts.entrySet()) {
            LogKey key = entry.getKey();
            Integer count = entry.getValue();

            // 기존에 해당 키가 존재하는지 확인
            Row row = existingRowsMap.get(key);

            if (row != null) {
                int existingCount = (int) row.getCell(3).getNumericCellValue();
                row.getCell(3).setCellValue(existingCount + count);
            } else {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(key.getMemberId());
                row.createCell(1).setCellValue(key.getId());
                row.createCell(2).setCellValue(key.getType());
                row.createCell(3).setCellValue(count);
            }
        }
    }

    @Override
    public LoginData find(String logMessage, String messageIdentifier) {
        Pattern pattern = createLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new LoginData(matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), matcher.group(4),
                    matcher.group(5));
        }

        return null;
    }

    // private void updateSheetWithCounts(Sheet sheet, Map<String, Integer> counts,
    // String defaultValue) {
    // for (Map.Entry<String, Integer> entry : counts.entrySet()) {
    // boolean found = false;
    // int rowNum = sheet.getLastRowNum();
    // for (int i = 1; i <= rowNum; i++) {
    // Row row = sheet.getRow(i);
    // if (row != null &&
    // row.getCell(0).getStringCellValue().equals(entry.getKey())) {
    // row.getCell(1).setCellValue(row.getCell(1).getNumericCellValue() +
    // entry.getValue());
    // found = true;
    // break;
    // }
    // }
    // if (!found) {
    // Row row = sheet.createRow(rowNum + 1);
    // row.createCell(0).setCellValue(entry.getKey());
    // row.createCell(1).setCellValue(entry.getValue());
    // if (defaultValue != null) {
    // row.createCell(2).setCellValue(defaultValue);
    // }
    // }
    // }
    // }

    @Override
    public LoginErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new LoginErrorData(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4));
        }

        return null;
    }

    @Override
    public void appendErrorLoginErrorData(Workbook workbook, List<LoginErrorData> logins, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, loginErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (LoginErrorData login : logins) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(login.getDate());
            row.createCell(1).setCellValue(login.getMessage());
            row.createCell(2).setCellValue(login.getId());
            row.createCell(3).setCellValue(login.getType());
        }
    }
}
