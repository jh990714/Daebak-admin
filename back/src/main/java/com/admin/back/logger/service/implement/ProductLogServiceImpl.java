package com.admin.back.logger.service.implement;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import com.admin.back.logger.dto.Product.ProductData;
import com.admin.back.logger.dto.Product.ProductKey;
import com.admin.back.logger.service.service.ProductLogService;

@Service
public class ProductLogServiceImpl implements ProductLogService {
    private String[] productLogHeaders = { "Date", "Message", "Product Id", "Product Name" };
    private String[] productLogStatisticsHeaders = {"Product Id", "Product Name", "Count" };

    private Pattern createInfoLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), ProductId: (\\d+), Product Name: (.*)",
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
    public void appendInfoProductData(Workbook workbook, List<ProductData> products, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, productLogHeaders);
        int rowNum = sheet.getLastRowNum() + 1;

        for (ProductData product : products) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(product.getDate());
            row.createCell(1).setCellValue(product.getMessage());
            row.createCell(2).setCellValue(product.getProductId());
            row.createCell(3).setCellValue(product.getProductName());
        }
    }

    @Override
    public ProductData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createInfoLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new ProductData(
                    matcher.group(1),
                    matcher.group(2),
                    Long.parseLong(matcher.group(3)),
                    matcher.group(4)
            );
        }

        return null;
    }

    @Override
    public void updateProductStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<ProductData> products, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, productLogStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, productLogStatisticsHeaders);

        Map<ProductKey, Integer> dailyCounts = calculateGroupedStatistics(products);
        Map<ProductKey, Integer> monthlyCounts = calculateGroupedStatistics(products);

        updateSheetWithCounts(dailySheet, dailyCounts);
        updateSheetWithCounts(monthlySheet, monthlyCounts);
    }

    private Map<ProductKey, Integer> calculateGroupedStatistics(List<ProductData> products) {
        Map<ProductKey, Integer> counts = new HashMap<>();

        for (ProductData product : products) {
            ProductKey key = new ProductKey(product.getProductId(), product.getProductName());
            counts.merge(key, 1, Integer::sum);
        }

        return counts;
    }

    private void updateSheetWithCounts(Sheet sheet, Map<ProductKey, Integer> counts) {
        // 기존 행을 맵으로 저장
        Map<ProductKey, Row> existingRowsMap = new HashMap<>();
    
        for (int i = 1; i <= sheet.getLastRowNum(); i++) { // 헤더를 건너뛰고 시작
            Row row = sheet.getRow(i);
            if (row == null) continue;
    
            ProductKey key = new ProductKey(
                    (long) row.getCell(0).getNumericCellValue(),
                    row.getCell(1).getStringCellValue()
            );
    
            existingRowsMap.put(key, row);
        }
    
        // 새로운 데이터로 시트 업데이트
        int rowNum = sheet.getLastRowNum() + 1;
    
        for (Map.Entry<ProductKey, Integer> entry : counts.entrySet()) {
            ProductKey key = entry.getKey();
            Integer count = entry.getValue();
    
            // 기존에 해당 키가 존재하는지 확인
            Row row = existingRowsMap.get(key);
    
            if (row != null) {
                // 기존 행이 있을 경우 수량을 업데이트
                int existingCount = (int) row.getCell(2).getNumericCellValue();
                row.getCell(2).setCellValue(existingCount + count);
            } else {
                // 기존 행이 없을 경우 새로운 행을 생성
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(key.getProductId());
                row.createCell(1).setCellValue(key.getProductName());
                row.createCell(2).setCellValue(count);
            }
        }
    }
    
}
