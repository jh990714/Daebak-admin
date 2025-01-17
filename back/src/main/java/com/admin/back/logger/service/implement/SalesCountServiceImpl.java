package com.admin.back.logger.service.implement;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.admin.back.logger.service.service.SalesCountService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalesCountServiceImpl implements SalesCountService {

    @Value("${logging.file.path}")
    private String loggingPath;

    @Override
    public int getSalesCountForDate(Date date) {

        String filePath = loggingPath + "/info/statistics/"
                + formatDate(date, "yyyy/MM")
                + "/log_statistics_"
                + formatDate(date, "yyyy-MM-dd")
                + ".xlsx";
        try (FileInputStream fileInputStream = new FileInputStream(filePath);
                Workbook workbook = WorkbookFactory.create(fileInputStream)) { // Apache POI 최신 방식

            Sheet sheet = workbook.getSheet("회원별 주문 항목 통계");
            if (sheet == null) {
                throw new RuntimeException("회원별 주문 항목 통계 시트를 찾을 수 없습니다.");
            }

            int totalSalesCount = 0;

            // 첫 번째 데이터 행(1번 행부터 시작)을 기준으로 루프
            for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
                Row row = sheet.getRow(rowIndex);
                if (row == null) {
                    continue; // 빈 행은 건너뛰기
                }

                Cell countCell = row.getCell(4); // Count 컬럼 (Index 4)
                if (countCell != null && countCell.getCellType() == CellType.NUMERIC) {
                    totalSalesCount += (int) countCell.getNumericCellValue(); // Count 값을 합산
                }
            }

            return totalSalesCount;

        } catch (IOException e) {
            throw new RuntimeException("로그 파일을 읽어오는 중 오류가 발생하였습니다.", e);
        }
    }

    private String formatDate(Date date, String pattern) {
        // 날짜 포맷을 "yyyyMMdd"로 지정합니다.
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

}
