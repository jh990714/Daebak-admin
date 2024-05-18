package com.admin.back.dto;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReviewDto {
    private int reviewId;

    private int productId;
    private String productName;

    private int optionId;
    private String optionName;

    private Long memberId;
    private String memberName;

    private String contents;
    private int score;
    private Date reviewDate;
    private Boolean isBest;
    private String orderNumber;
    private List<String> imgUrl;
    private List<ReviewResponseDto> response;
}
