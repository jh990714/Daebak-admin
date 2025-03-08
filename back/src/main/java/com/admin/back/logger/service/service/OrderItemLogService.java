package com.admin.back.logger.service.service;

import java.util.List;
import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.Order.OrderItemData;
import com.admin.back.logger.dto.Order.OrderItemErrorData;

public interface OrderItemLogService {
    public void appendInfoOrderItemData(Workbook workbook, List<OrderItemData> orderItems, String sheetName);
    public void appendErrorOrderItemData(Workbook workbook, List<OrderItemErrorData> orderItems, String sheetName);
    public void updateOrderStatistics(Workbook workbook, Workbook workbookMonthlyStatistics, List<OrderItemData> orders, String sheetName);
    public void updateProductStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<OrderItemData> orders, String sheetName);
    public OrderItemData findInfo(String logMessage, String messageIdentifier);
    public OrderItemErrorData findError(String logMessage, String messageIdentifier);
}
