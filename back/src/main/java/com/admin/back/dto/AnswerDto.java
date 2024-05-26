package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AnswerDto {
    private Long answerId;
    private String responseText;
    private Date responseDate;
}
