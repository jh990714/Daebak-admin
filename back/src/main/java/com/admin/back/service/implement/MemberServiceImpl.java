package com.admin.back.service.implement;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.admin.back.dto.MemberCouponDto;
import com.admin.back.dto.MemberDto;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;
import com.admin.back.mapper.Mapper;
import com.admin.back.repository.MemberCouponRepository;
import com.admin.back.repository.MemberRepository;
import com.admin.back.service.service.MemberService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final MemberCouponRepository memberCouponRepository;
    private final Mapper mapper;

    @PersistenceContext
    private EntityManager entityManager; // EntityManager 주입

    public List<MemberDto> getMembers() {
       List<MemberEntity> memberEntities = memberRepository.findAll();
       return memberEntities.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional 
    @Override
    public MemberDto updateMember(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());

        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            memberEntity.setName(memberDto.getName());
            memberEntity.setId(memberDto.getId());
            memberEntity.setEmail(memberDto.getEmail());
            memberEntity.setPhone(memberDto.getPhone());
            memberEntity.setAddress(memberDto.getAddress());

            MemberEntity updatedMemberEntity = memberRepository.save(memberEntity);
            System.out.println(updatedMemberEntity.toString());
            return mapper.toDto(updatedMemberEntity);
        } else {
            // 해당 memberId를 가진 멤버를 찾을 수 없을 경우 예외 처리
            throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
        }
    }

    @Transactional 
    @Override
    public MemberDto updateMemberCoupon(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());
    
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
    
            memberCouponRepository.deleteByMember(memberEntity);

            Set<MemberCouponEntity> memberCoupons = memberDto.getMemberCoupons().stream()
                    .map(memberCouponDto -> mapper.toEntity(memberCouponDto))
                    .collect(Collectors.toSet());
            
            memberCoupons.forEach(memberCoupon -> memberCoupon.setMember(memberEntity));
            memberCouponRepository.saveAll(memberCoupons);
    
            return memberDto;
        } else {
            throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
        }
    }
    

}
