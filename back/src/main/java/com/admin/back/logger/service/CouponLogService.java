package com.admin.back.logger.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.CouponData;

public interface CouponLogService {
    public void appendInfoCouponData(Workbook workbook, List<CouponData> coupons, String sheetName);
    public CouponData findInfo(String logMessage, String messageIdentifier);
}
