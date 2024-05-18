package com.admin.back.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "reviews")
@Getter @Setter
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "product_id")
    private int productId;

    @Column(name = "option_id")
    private int optionId;

    @Column(name = "contents")
    private String contents;

    @Column(name = "score")
    private int score;

    @Column(name = "review_date")
    private Date reviewDate;

    @Column(name = "is_best")
    private Boolean isBest;

    @Column(name = "order_number")
    private String orderNumber;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "member_id", insertable = false, updatable = false)
    private MemberEntity member;

    // @ManyToOne
    // @JoinColumn(name = "option_id", insertable = false, updatable = false)
    // private OptionEntity option;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewResponseEntity> responses;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<ReviewImageEntity> images;

    // Getters and Setters
}
