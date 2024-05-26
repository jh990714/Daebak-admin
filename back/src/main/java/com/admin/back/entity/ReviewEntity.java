package com.admin.back.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reviews")
@Getter @Setter
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "contents")
    private String contents;

    @Column(name = "score")
    private int score;

    @Column(name = "review_date")
    private LocalDateTime reviewDate;

    @Column(name = "is_best")
    private Boolean isBest;

    @Column(name = "order_number")
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private MemberEntity member;

    @ManyToOne
    @JoinColumn(name = "option_id", insertable = false, updatable = false)
    private OptionEntity option;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewResponseEntity> responses;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewImageEntity> images;

    public void addResponse(ReviewResponseEntity reviewResponseEntity) {
        this.responses.add(reviewResponseEntity);
        reviewResponseEntity.setReview(this);
    }
}
