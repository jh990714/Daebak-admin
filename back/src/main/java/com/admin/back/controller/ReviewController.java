package com.admin.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.ReviewDto;
import com.admin.back.dto.ReviewResponseDto;
import com.admin.back.service.service.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("all")
    public ResponseEntity<?> getAllReviews() {
        List<ReviewDto> reviewDtos = reviewService.getAllReviews();
        return ResponseEntity.ok().body(reviewDtos);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> putMethodName(@PathVariable Long reviewId, @RequestBody ReviewResponseDto reviewResponse) {
        ReviewDto reviewDto = reviewService.saveReviewResponse(reviewId, reviewResponse);
        
        return ResponseEntity.ok().body(reviewDto);
    }
}
