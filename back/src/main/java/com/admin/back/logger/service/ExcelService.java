package com.admin.back.logger.service;

import java.io.IOException;

import org.apache.poi.ss.usermodel.Workbook;

public interface ExcelService {
    public Workbook readWorkbook(String filePath) throws IOException;
    public void writeWorkbook(Workbook workbook, String filePath) throws IOException;
    public void processLogs(String path) throws IOException;
}
