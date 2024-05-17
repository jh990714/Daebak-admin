package com.admin.back.dto;

import java.util.Date;
import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberDto {
    private Long id;
    private Author author;
    private String email;
    private String phone;
    private String address; 
    private BigDecimal points;
    private Long coupons;
    private Date employed;

    @Getter @Setter
    public static class Author {
        private String name;
        private String id;

        public Author(String name, String id) {
            this.name = name;
            this.id = id;
        }
    }
}

