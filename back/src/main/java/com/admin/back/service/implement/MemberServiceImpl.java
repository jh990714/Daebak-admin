package com.admin.back.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.admin.back.dto.MemberDto;
import com.admin.back.entity.MemberEntity;
import com.admin.back.mapper.MemberMapper;
import com.admin.back.repository.MemberRepository;
import com.admin.back.service.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    public List<MemberDto> getMembers() {
       List<MemberEntity> memberEntities = memberRepository.findAll();
       return memberEntities.stream()
                .map(memberMapper::toDto)
                .collect(Collectors.toList());
    }
    
}
