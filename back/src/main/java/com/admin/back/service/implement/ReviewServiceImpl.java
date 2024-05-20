package com.admin.back.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.admin.back.dto.ReviewDto;
import com.admin.back.dto.ReviewResponseDto;
import com.admin.back.entity.ReviewEntity;
import com.admin.back.entity.ReviewResponseEntity;
import com.admin.back.repository.ReviewRepository;
import com.admin.back.service.service.ReviewService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<ReviewDto> getAllReviews() {
        List<ReviewEntity> reviews = reviewRepository.findAll();

        return reviews.stream().map(review -> {
            ReviewDto dto = new ReviewDto();
            dto.setReviewId(review.getReviewId());
            dto.setProductId(review.getProductId());
            dto.setProductName(review.getProduct().getName());
            dto.setOptionId(review.getOptionId());
            dto.setMemberId(review.getMember().getMemberId());
            dto.setMemberName(review.getMember().getName());
            dto.setContents(review.getContents());
            dto.setScore(review.getScore());
            dto.setReviewDate(review.getReviewDate());
            dto.setIsBest(review.getIsBest());
            dto.setOrderNumber(review.getOrderNumber());

            dto.setImgUrl(review.getImages().stream()
                    .map(image -> image.getImageUrl())
                    .collect(Collectors.toList()));

            dto.setResponse(review.getResponses().stream()
                    .map(response -> {
                        ReviewResponseDto responseDTO = new ReviewResponseDto();
                        responseDTO.setResponseId(response.getResponseId());
                        responseDTO.setAdminId(response.getAdminId());
                        responseDTO.setResponseText(response.getResponseText());
                        responseDTO.setResponseDate(response.getResponseDate());
                        return responseDTO;
                    }).collect(Collectors.toList()));

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ReviewDto saveReviewResponse(Long reviewId, ReviewResponseDto reviewResponse) {
        
        Optional<ReviewEntity> optionalReviewEntity = reviewRepository.findById(reviewId);
        
        if (optionalReviewEntity.isPresent()) {
            ReviewEntity reviewEntity = optionalReviewEntity.get();

            ReviewResponseEntity reviewResponseEntity = new ReviewResponseEntity();
            reviewResponseEntity.setAdminId(reviewResponse.getAdminId());
            reviewResponseEntity.setResponseText(reviewResponse.getResponseText());
            
            reviewEntity.addResponse(reviewResponseEntity);

            ReviewEntity saveReviewEntity = reviewRepository.save(reviewEntity);

            return ReviewDto.fromEntity(saveReviewEntity);
        } else {
            throw new IllegalArgumentException("Review with id " + reviewId + " not found");
        }
    }   
}
