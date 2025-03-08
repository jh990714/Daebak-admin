package com.admin.back.logger.service.implement;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.admin.back.dto.CustomData.Product;
import com.admin.back.entity.ProductEntity;
import com.admin.back.logger.dto.Order.OrderStatisticsData;
import com.admin.back.logger.service.service.ProductSalesService;
import com.admin.back.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductSalesServiceImpl implements ProductSalesService {

    @Value("${logging.file.path}")
    private String loggingPath;

    private final ProductRepository productRepository;

    @Override
public List<OrderStatisticsData> getProductSalesInRange(Date startDate, Date endDate) {
    List<OrderStatisticsData> result = new ArrayList<>();
    
    // 날짜 범위 내의 각 월을 처리
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(startDate);
    
    while (!calendar.getTime().after(endDate)) {
        String filePath = loggingPath + "/info/statistics/"
                + formatDate(calendar.getTime(), "yyyy/MM")
                + "/log_statistics_"
                + formatDate(calendar.getTime(), "yyyy-MM")
                + ".xlsx";

        try {
            // 파일이 존재하는지 확인
            File file = new File(filePath);
            if (!file.exists()) {
                System.out.println("파일이 존재하지 않음: " + filePath); // 파일 없을 때 건너뛰기
                calendar.add(Calendar.MONTH, 1);
                continue; // 파일이 없으면 다음 월로 이동
            }

            try (FileInputStream fileInputStream = new FileInputStream(filePath);
                 Workbook workbook = WorkbookFactory.create(fileInputStream)) {
                
                // 판매 통계 시트와 취소 통계 시트
                Sheet orderSheet = workbook.getSheet("상품별 주문 횟수 통계");
                Sheet cancelSheet = workbook.getSheet("상품별 취소 횟수 통계");

                if (orderSheet == null || cancelSheet == null) {
                    throw new RuntimeException("통계 시트를 찾을 수 없습니다.");
                }

                // 상품별 주문 데이터를 저장할 Map
                Map<Long, OrderStatisticsData> statisticsDataMap = parseOrderData(orderSheet);

                // 취소 데이터로 기존 주문 데이터 수정
                adjustDataWithCancelData(cancelSheet, statisticsDataMap);

                // 상품 이미지 정보 가져오기
                Map<Long, String> productImages = fetchProductImages(new ArrayList<>(statisticsDataMap.values()));

                // 각 상품에 대해 이미지를 추가
                statisticsDataMap.values().forEach(data -> {
                    String imageUrl = productImages.getOrDefault(data.getProductId(), null);
                    data.setImageUrl(imageUrl); // 상품 이미지 추가
                });

                // 결과에 합산된 데이터 추가
                result.addAll(statisticsDataMap.values());

            } catch (IOException e) {
                throw new RuntimeException("로그 파일을 읽어오는 중 오류가 발생하였습니다.", e);
            }
        } catch (Exception e) {
            // 예외가 발생하더라도 로그파일이 없을 경우 건너뛰는 방식으로 처리
            System.out.println("파일 처리 중 오류 발생: " + filePath + " -> 건너뜁니다.");
        }
        
        // 한 달 뒤로 이동
        calendar.add(Calendar.MONTH, 1);
    }

    // 상품별로 합산된 데이터를 정렬하여 반환
    Map<Long, OrderStatisticsData> finalDataMap = result.stream()
            .collect(Collectors.toMap(OrderStatisticsData::getProductId, data -> data, (existing, replacement) -> {
                existing.setAmount(existing.getAmount() + replacement.getAmount());
                existing.setQuantity(existing.getQuantity() + replacement.getQuantity());
                return existing;
            }));

    return finalDataMap.values().stream()
            .sorted(Comparator.comparingDouble(OrderStatisticsData::getAmount).reversed())
            .collect(Collectors.toList());
}


    private Map<Long, OrderStatisticsData> parseOrderData(Sheet sheet) {
        Map<Long, OrderStatisticsData> statisticsDataMap = new HashMap<>();

        for (Row row : sheet) {
            if (row.getRowNum() == 0)
                continue; // 헤더 행 건너뛰기

            long productId = (long) getNumericCellValue(row, 0); // 상품 ID
            double salesAmount = getNumericCellValue(row, 3); // 판매 금액
            int quantity = (int) getNumericCellValue(row, 2); // 판매 수량

            // 이미 존재하는 상품이면 수량과 금액을 합산, 없으면 새로 추가
            OrderStatisticsData data = statisticsDataMap.getOrDefault(productId, new OrderStatisticsData());
            data.setProductId(productId);
            data.setProductName(getStringCellValue(row, 1)); // 상품 이름
            data.setAmount(data.getAmount() + salesAmount);
            data.setQuantity(data.getQuantity() + quantity);
            statisticsDataMap.put(productId, data);
        }
        return statisticsDataMap;
    }

    private void adjustDataWithCancelData(Sheet cancelSheet, Map<Long, OrderStatisticsData> statisticsDataMap) {
        for (Row row : cancelSheet) {
            if (row.getRowNum() == 0)
                continue; // 헤더 행 건너뛰기

            long productId = (long) getNumericCellValue(row, 0); // 상품 ID
            String productName = getStringCellValue(row, 1);
            int cancelQuantity = (int) getNumericCellValue(row, 2); // 취소 수량
            double cancelAmount = getNumericCellValue(row, 3); // 취소 금액

            OrderStatisticsData data = statisticsDataMap.getOrDefault(productId, new OrderStatisticsData(productId, productName, 0, 0));

            data.setAmount(data.getAmount() - cancelAmount);
            data.setQuantity(data.getQuantity() - cancelQuantity);
        }
    }

    private double getNumericCellValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex);
        if (cell != null && cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        }
        return 0; // 기본값
    }

    private String getStringCellValue(Row row, int cellIndex) {
        Cell cell = row.getCell(cellIndex);
        if (cell != null && cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        }
        return ""; // 기본값
    }

    private String formatDate(Date date, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    private Map<Long, String> fetchProductImages(List<OrderStatisticsData> statisticsDataList) {
        List<Long> productIds = statisticsDataList.stream()
                .map(OrderStatisticsData::getProductId)
                .collect(Collectors.toList());

        List<ProductEntity> products = productRepository.findAllById(productIds);
        return products.stream()
                .collect(Collectors.toMap(ProductEntity::getProductId, ProductEntity::getImageUrl));
    }
}
