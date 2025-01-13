package com.admin.back.logger.implement;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.math.BigDecimal;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Service;

import com.admin.back.logger.service.OrderItemLogService;
import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Order.OrderItemErrorData;
import com.admin.back.logger.dto.Order.OrderKey;
import com.admin.back.logger.dto.Order.OrderStatistics;
import com.admin.back.logger.dto.Product.ProductSalesStatistics;

@Service
public class OrderItemLogServiceImpl implements OrderItemLogService {
    private String[] orderItemLogHeaders = { "Date", "Message", "Member ID", "ID", "OrderNumber", "Product ID", "Product Name", "Quantity", "Amount" };
    private String[] orderItemErrorLogHeaders = { "Date", "Message", "Product ID", "Product Name" };
    private String[] orderItemStatisticsHeaders = { "Member ID", "ID", "Product ID", "Product Name", "Quantity", "Total Amount" };
    private String[] productStatisticsHeaders = { "Product ID", "Product Name", "Total Quantity", "Total Amount" };
    
    private Pattern createLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) INFO .* - %s - Message: (.*), MemberId: (.*), ID: (.*), OrderNumber: (.*), ProductId: (.*), ProductName: (.*), Quantity: (\\d+), Amount: (\\d+)",
                messageIdentifier);
        return Pattern.compile(patternString);
    }
    
    private Pattern createErrorLogPattern(String messageIdentifier) {
        String patternString = String.format(
                "(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) ERROR .* - %s - Message: (.*), ProductId: (.*), ProductName: (.*)",
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
    public void appendInfoOrderItemData(Workbook workbook, List<OrderItemData> orders, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderItemLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderItemData order : orders) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(order.getDate());
            row.createCell(1).setCellValue(order.getMessage());
            row.createCell(2).setCellValue(order.getMemberId());
            row.createCell(3).setCellValue(order.getId());
            row.createCell(4).setCellValue(order.getOrderNumber());
            row.createCell(5).setCellValue(order.getProductId());
            row.createCell(6).setCellValue(order.getProductName());
            row.createCell(7).setCellValue(order.getQuantity());
            row.createCell(8).setCellValue(order.getAmount().doubleValue());
        }
    }

    @Override
    public void updateOrderStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<OrderItemData> orders, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, orderItemStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, orderItemStatisticsHeaders);

        Map<OrderKey, OrderStatistics> dailyGroupedCounts = calculateGroupedStatistics(orders);
        Map<OrderKey, OrderStatistics> monthlyGroupedCounts = calculateGroupedStatistics(orders);

        updateSheetWithGroupedCounts(dailySheet, dailyGroupedCounts);
        updateSheetWithGroupedCounts(monthlySheet, monthlyGroupedCounts);
    }


    private Map<OrderKey, OrderStatistics> calculateGroupedStatistics(List<OrderItemData> orders) {
        Map<OrderKey, OrderStatistics> groupedStatistics = new HashMap<>();
    
        for (OrderItemData order : orders) {
            OrderKey key = new OrderKey(
                    order.getMemberId(),
                    order.getId(),
                    order.getProductId(),
                    order.getProductName());
   
            // 그룹화된 통계 객체를 가져와서 업데이트
            OrderStatistics statistics = groupedStatistics.computeIfAbsent(key, k -> new OrderStatistics());

            statistics.incrementCount(order.getQuantity());
            statistics.addAmount(order.getAmount());
        }
    
        return groupedStatistics;
    }

    private void updateSheetWithGroupedCounts(Sheet sheet, Map<OrderKey, OrderStatistics> groupedStatistics) {
        Map<OrderKey, Row> existingRowsMap = new HashMap<>();
    
        // 기존 행을 맵에 저장
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            OrderKey key = new OrderKey(
                    (long) row.getCell(0).getNumericCellValue(), // memberId
                    row.getCell(1).getStringCellValue(), // id
                    (long) row.getCell(2).getNumericCellValue(), // productId
                    row.getCell(3).getStringCellValue()  // productName
            );
            existingRowsMap.put(key, row);
        }
     
        int rowNum = sheet.getLastRowNum() + 1;
    
        // 통계 값을 시트에 업데이트
        for (Map.Entry<OrderKey, OrderStatistics> entry : groupedStatistics.entrySet()) {
            OrderKey key = entry.getKey();
            Integer quantity = entry.getValue().getQuantity(); // getCount()로 수량 가져오기

            BigDecimal amount = entry.getValue().getAmount(); // getAmount()로 금액 가져오기
    
            Row row = existingRowsMap.get(key);
    
            if (row != null) {
                // 기존 행이 있을 경우 수량과 금액을 업데이트
                int existingQuantity = (int) row.getCell(4).getNumericCellValue();

                row.getCell(4).setCellValue(existingQuantity + quantity);

                BigDecimal existingAmount = new BigDecimal(row.getCell(5).getNumericCellValue());
                row.getCell(5).setCellValue(existingAmount.add(amount).doubleValue());
            } else {
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(key.getMemberId());
                row.createCell(1).setCellValue(key.getId());
                row.createCell(2).setCellValue(key.getProductId());
                row.createCell(3).setCellValue(key.getProductName());
                row.createCell(4).setCellValue(quantity);
                row.createCell(5).setCellValue(amount.doubleValue());
            }
        }
    }
    
    @Override
    public void updateProductStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<OrderItemData> orders, String sheetName) {
        Sheet dailySheet = getOrCreateSheet(workbook, sheetName, productStatisticsHeaders);
        Sheet monthlySheet = getOrCreateSheet(workbookMonthlyStatistic, sheetName, productStatisticsHeaders);

        Map<Long, ProductSalesStatistics> dailyProductStatistics = calculateProductStatistics(orders);
        Map<Long, ProductSalesStatistics> monthlyProductStatistics = calculateProductStatistics(orders);

        updateSheetWithProductStatistics(dailySheet, dailyProductStatistics);
        updateSheetWithProductStatistics(monthlySheet, monthlyProductStatistics);
    }

    private Map<Long, ProductSalesStatistics> calculateProductStatistics(List<OrderItemData> orders) {
        Map<Long, ProductSalesStatistics> productStatisticsMap = new HashMap<>();
    
        for (OrderItemData order : orders) {
            Long productId = order.getProductId();
            String productName = order.getProductName();
    
            // Map에서 기존 통계 객체를 가져오거나 새로 생성
            ProductSalesStatistics stats = productStatisticsMap.computeIfAbsent(
                productId, 
                id -> new ProductSalesStatistics(productId, productName)
            );
    
            // 통계 업데이트
            stats.incrementQuantity(order.getQuantity());
            stats.addAmount(order.getAmount());
        }
    
        return productStatisticsMap;
    }

    private void updateSheetWithProductStatistics(Sheet sheet, Map<Long, ProductSalesStatistics> productStatistics) {
        Map<Long, Row> existingRowsMap = new HashMap<>();
    
        // 기존 시트 데이터를 맵으로 저장 (Product ID를 기준으로)
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Row row = sheet.getRow(i);
            if (row == null) continue;
    
            Long productId = (long) row.getCell(0).getNumericCellValue(); // Product ID
            existingRowsMap.put(productId, row);
        }
    
        int rowNum = sheet.getLastRowNum() + 1;
    
        // 통계 데이터를 시트에 업데이트
        for (Map.Entry<Long, ProductSalesStatistics> entry : productStatistics.entrySet()) {
            Long productId = entry.getKey();
            ProductSalesStatistics stats = entry.getValue();
    
            Row row = existingRowsMap.get(productId);
    
            if (row != null) {
                // 기존 행이 있는 경우 업데이트
                int existingQuantity = (int) row.getCell(2).getNumericCellValue(); // Quantity
                row.getCell(2).setCellValue(existingQuantity + stats.getTotalQuantity());
    
                BigDecimal existingAmount = new BigDecimal(row.getCell(3).getNumericCellValue()); // Amount
                row.getCell(3).setCellValue(existingAmount.add(stats.getTotalAmount()).doubleValue());
            } else {
                // 기존 행이 없는 경우 새로 추가
                row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(stats.getProductId()); // Product ID
                row.createCell(1).setCellValue(stats.getProductName()); // Product Name
                row.createCell(2).setCellValue(stats.getTotalQuantity()); // Quantity
                row.createCell(3).setCellValue(stats.getTotalAmount().doubleValue()); // Amount
            }
        }
    }
    
    @Override
    public OrderItemData findInfo(String logMessage, String messageIdentifier) {
        Pattern pattern = createLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new OrderItemData(matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), matcher.group(4), matcher.group(5), Long.parseLong(matcher.group(6)), matcher.group(7), Integer.parseInt(matcher.group(8)), new BigDecimal(matcher.group(9)));
        }

        return null;
    }

    @Override
    public OrderItemErrorData findError(String logMessage, String messageIdentifier) {
        Pattern pattern = createErrorLogPattern(messageIdentifier);
        Matcher matcher = pattern.matcher(logMessage);

        if (matcher.find()) {
            return new OrderItemErrorData(
                    matcher.group(1), matcher.group(2), Long.parseLong(matcher.group(3)), matcher.group(4));
        }

        return null;
    }

    @Override
    public void appendErrorOrderItemData(Workbook workbook, List<OrderItemErrorData> errors, String sheetName) {
        Sheet sheet = getOrCreateSheet(workbook, sheetName, orderItemErrorLogHeaders);

        int rowNum = sheet.getLastRowNum() + 1;
        for (OrderItemErrorData error : errors) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(error.getDate());
            row.createCell(1).setCellValue(error.getMessage());
            row.createCell(2).setCellValue(error.getProductId());
            row.createCell(3).setCellValue(error.getProductName());
        }
    }
}
