package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.AnswerDto;
import com.admin.back.dto.QuestionDto;
import com.admin.back.entity.QuestionEntity;
import com.admin.back.repository.QuestionRepository;
import com.admin.back.service.service.QnaService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QnaServiceImpl implements QnaService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<QuestionDto> getAllQna() {
        List<QuestionEntity> questions = questionRepository.findAll();

        return questions.stream().map(question -> {
            QuestionDto dto = new QuestionDto();
            dto.setQuestionId(question.getQuestionId());
            dto.setQuestion(question.getQuestion());
            dto.setCreatedAt(question.getCreatedAt());
            dto.setName(question.getMember().getName());

            dto.setAnswers(question.getAnswers().stream()
                    .map(answer -> {
                        AnswerDto answerDto = new AnswerDto();
                        answerDto.setAnswerId(answer.getAnswerId());
                        answerDto.setResponseText(answer.getContent());
                        answerDto.setResponseDate(answer.getCreatedAt());
                        return answerDto;
                    }).collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }
}
