package com.admin.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.QuestionDto;
import com.admin.back.service.service.QnaService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("qna")
@RequiredArgsConstructor
public class QnaController {

    @Autowired
    private QnaService qnaService;

    @GetMapping("all")
    public List<QuestionDto> getAllQna() {
        return qnaService.getAllQna();
    }
}
