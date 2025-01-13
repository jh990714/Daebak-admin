package com.admin.back.logger.implement;

import java.util.*;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationErrorData;
import com.admin.back.logger.dto.Product.ProductKey;
import com.admin.back.logger.service.RegistrationService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    private String[] registrationLogHeaders = { "Date", "Message", "Member ID", "ID", "Type" };
    private String[] registrationErrorLogHeaders = { "Message", "ID", "Type" };
    private String[] registrationStatisticsHeaders = { "Type", "Count" };

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
    public void appendInfoRegistrationData(Workbook workbook, List<RegistrationData> registrations, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, registrationLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (RegistrationData registration : registrations) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(registration.getDate());
            row.createCell(1).setCellValue(registration.getMessage());
            row.createCell(2).setCellValue(registration.getMemberId());
            row.createCell(3).setCellValue(registration.getId());
            row.createCell(4).setCellValue(registration.getType());
        }
    }

    @Override
    public void updateRegistrationStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<RegistrationData> registrations, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, registrationStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, registrationStatisticsHeaders);

        Map<String, Integer> dailyCounts = calculateGroupedStatistics(registrations);
        Map<String, Integer> monthlyCounts = calculateGroupedStatistics(registrations);

        updateSheetWithGroupedCounts(dailySheet, dailyCounts);
        updateSheetWithGroupedCounts(monthlySheet, monthlyCounts);
    }

    private Map<String, Integer> calculateGroupedStatistics(List<RegistrationData> registrations) {
        Map<String, Integer> groupedCounts = new HashMap<>();

        for (RegistrationData registration : registrations) {
            String type = registration.getType();
            groupedCounts.merge(type, 1, Integer::sum);
        }

        return groupedCounts;
    }

    private void updateSheetWithGroupedCounts(Sheet sheet, Map<String, Integer> groupedCounts) {
        Map<String, Row> existingRowsMap = new HashMap<>();

        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            String type = row.getCell(0).getStringCellValue();
            existingRowsMap.put(type, row);
        }

        int rowNum = sheet.getLastRowNum() + 1;

        for (Map.Entry<String, Integer> entry : groupedCounts.entrySet()) {
            String type = entry.getKey();
            Integer count = entry.getValue();

            Row row = existingRowsMap.get(type);

            if (row != null) {
                int existingCount = (int) row.getCell(1).getNumericCellValue();
                row.getCell(1).setCellValue(existingCount + count);
            } else {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(type);
                row.createCell(1).setCellValue(count);
            }
        }
    }

    @Override
    public RegistrationData find(String logMessage, String messageIdentifier) {
        Pattern pattern = createLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new RegistrationData(matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), matcher.group(4),
                    matcher.group(5));
        }

        return null;
    }

    @Override
    public RegistrationErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new RegistrationErrorData(matcher.group(1), matcher.group(2), matcher.group(3), matcher.group(4));
        }

        return null;
    }

    @Override
    public void appendErrorRegistrationErrorData(Workbook workbook, List<RegistrationErrorData> errors,
            String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, registrationErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (RegistrationErrorData error : errors) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(error.getDate());
            row.createCell(1).setCellValue(error.getMessage());
            row.createCell(2).setCellValue(error.getId());
            row.createCell(3).setCellValue(error.getType());
        }
    }
}
