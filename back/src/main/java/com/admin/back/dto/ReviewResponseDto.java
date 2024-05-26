package com.admin.back.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewResponseDto {
    private Long responseId;
    private int adminId;
    private String responseText;
    private Date responseDate;

    // Getters and Setters
}
