package com.admin.back.logger.service.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.Point.PointData;
import com.admin.back.logger.dto.Point.PointErrorData;

public interface PointLogService {
    public void appendInfoPointData(Workbook workbook, List<PointData> points, String sheetName);
    public void appendErrorPointData(Workbook workbook, List<PointErrorData> points, String sheetName);
    public PointData findInfo(String logMessage, String messageIdentifier);
    public PointErrorData findError(String logMessage, String messageIdentifier);
}