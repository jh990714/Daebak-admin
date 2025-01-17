package com.admin.back.logger.service.service;

import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.admin.back.logger.dto.RegistrationData;
import com.admin.back.logger.dto.RegistrationErrorData;

public interface RegistrationService {
    public void appendInfoRegistrationData(Workbook workbook, List<RegistrationData> logins, String sheetName);
    public RegistrationData find(String logMessage, String messageIdentifier);
    public RegistrationErrorData findError(String logMessage, String messageIdentifier);
    public void appendErrorRegistrationErrorData(Workbook workbook, List<RegistrationErrorData> errors, String sheetName);
    public void updateRegistrationStatistics(Workbook workbook, Workbook workbookMonthlyStatistic, List<RegistrationData> registrations, String sheetName);
}
