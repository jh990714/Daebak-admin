package com.admin.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.ReviewDto;
import com.admin.back.service.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService ReviewService;

    @GetMapping("all")
    public ResponseEntity<?> getAllReviews() {
        List<ReviewDto> reviewDtos = ReviewService.getAllReviews();
        return ResponseEntity.ok().body(reviewDtos);
    }
}
