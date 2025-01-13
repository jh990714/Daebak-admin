package com.admin.back.logger.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegistrationStatisticsData {
    private String type;
    private int count;

    public RegistrationStatisticsData(String type, int count) {
        this.type = type;
        this.count = count;
    }
}