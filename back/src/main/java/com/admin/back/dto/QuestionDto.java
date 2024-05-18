package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class QuestionDto {
    private int questionId;
    private String question;
    private Date createdAt;
    private String name; // 사용자 이름
    private List<AnswerDto> answers;
}
