package com.admin.back.service.implement;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.admin.back.dto.MemberDto;
import com.admin.back.entity.MemberCouponEntity;
import com.admin.back.entity.MemberEntity;
import com.admin.back.mapper.Mapper;
import com.admin.back.repository.MemberRepository;
import com.admin.back.service.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final Mapper mapper;

    public List<MemberDto> getMembers() {
       List<MemberEntity> memberEntities = memberRepository.findAll();
       return memberEntities.stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MemberDto updateMember(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(memberDto.getMemberId());

        MemberEntity updateMember = mapper.toEntity(memberDto);
        System.out.println(updateMember.toString());
        
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            memberEntity.setName(memberDto.getName());
            memberEntity.setId(memberDto.getId());
            memberEntity.setEmail(memberDto.getEmail());
            memberEntity.setPhone(memberDto.getPhone());
            memberEntity.setAddress(memberDto.getAddress());

            memberEntity.getMemberCoupons().clear();
            memberDto.getMemberCoupons().forEach(couponDto -> {
                MemberCouponEntity memberCouponEntity = mapper.toEntity(couponDto);
                memberEntity.addCoupon(memberCouponEntity);
            });

            MemberEntity updatedMemberEntity = memberRepository.save(memberEntity);
            return mapper.toDto(updatedMemberEntity);
        } else {
            // 해당 memberId를 가진 멤버를 찾을 수 없을 경우 예외 처리
            throw new IllegalArgumentException("Member with id " + memberDto.getMemberId() + " not found");
        }
    }

    @Override
    public MemberDto deleteMemberCoupon(MemberDto member) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteMemberCoupon'");
    }
}
