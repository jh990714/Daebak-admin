package com.admin.back.logger.service.implement;

import java.util.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.SearchData;
import com.admin.back.logger.service.service.SearchLogService;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SearchLogServiceImpl implements SearchLogService {
    private String[] searchLogHeaders = { "Date", "Message", "Query" };
    private String[] searchStatisticsLogHeaders = { "Query", "Count" };

    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), Search: (.*)",
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
    public void appendInfoSearchData(Workbook workbook, List<SearchData> searches, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, searchLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;
        for (SearchData search : searches) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(search.getDate());
            row.createCell(1).setCellValue(search.getMessage());
            row.createCell(2).setCellValue(search.getQuery());
        }
    }

    @Override
    public SearchData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);
        if (matcher.find()) {
            return new SearchData(matcher.group(1), matcher.group(2), matcher.group(3));
        }
        return null;
    }

    @Override
    public void updateSearchStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<SearchData> searches, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, searchStatisticsLogHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, searchStatisticsLogHeaders);
    
        // 일별 통계와 월별 통계 각각 처리
        Map<String, Integer> dailyGroupedCounts = calculateGroupedStatistics(searches);
        Map<String, Integer> monthlyGroupedCounts = calculateGroupedStatistics(searches);
    
        updateSheetWithGroupedCounts(dailySheet, dailyGroupedCounts);
        updateSheetWithGroupedCounts(monthlySheet, monthlyGroupedCounts);
    }
    
    private Map<String, Integer> calculateGroupedStatistics(List<SearchData> searches) {
        Map<String, Integer> groupedCounts = new HashMap<>();
    
        for (SearchData search : searches) {
            String query = search.getQuery();  // Query로만 그룹화
    
            groupedCounts.merge(query, 1, Integer::sum);
        }
    
        return groupedCounts;
    }
    
    private void updateSheetWithGroupedCounts(Sheet sheet, Map<String, Integer> groupedCounts) {
        Map<String, Row> existingRowsMap = new HashMap<>();
    
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            String query = row.getCell(0).getStringCellValue();  // 1번 인덱스에 Query가 있음
    
            existingRowsMap.put(query, row);
        }
    
        // 그룹화된 카운트를 시트에 업데이트
        int rowNum = sheet.getLastRowNum() + 1;
    
        for (Map.Entry<String, Integer> entry : groupedCounts.entrySet()) {
            String query = entry.getKey();
            Integer count = entry.getValue();
    
            // 기존에 해당 query가 존재하는지 확인
            Row row = existingRowsMap.get(query);
    
            if (row != null) {
                int existingCount = (int) row.getCell(1).getNumericCellValue(); // 2번 인덱스에 Count가 있음
                row.getCell(1).setCellValue(existingCount + count);
            } else {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(query);
                row.createCell(1).setCellValue(count);
            }
        }
    }
    
}
