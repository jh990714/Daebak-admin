package com.admin.back.mapper;

import com.admin.back.dto.MemberDto;
import com.admin.back.dto.MemberDto.Author;
import com.admin.back.entity.MemberEntity;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public MemberDto toDto(MemberEntity entity) {
        MemberDto dto = new MemberDto();

        dto.setId(entity.getMemberId());
        dto.setAuthor(new MemberDto.Author(entity.getName(), entity.getId()));
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setPoints(BigDecimal.ZERO);
        dto.setCoupons((long) 3);
        dto.setEmployed(new Date());

        return dto;
    }
}
