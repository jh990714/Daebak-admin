package com.admin.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.admin.back.dto.MemberDto;
import com.admin.back.entity.MemberEntity;
import com.admin.back.service.service.MemberService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@RestController
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;

    @GetMapping("getMembers")
    public ResponseEntity<?> getMembers() {
        List<MemberDto> memberEntities = memberService.getMembers();

        return ResponseEntity.ok().body(memberEntities);
    }

    @PutMapping("/update")
    public ResponseEntity<MemberDto> updateMember(@RequestBody MemberDto member) {
        MemberDto updatedMember = memberService.updateMember(member);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }

    @PutMapping("/updateCoupon")
    public ResponseEntity<MemberDto> updateMemberCoupon(@RequestBody MemberDto member) {
        MemberDto updatedMember = memberService.updateMemberCoupon(member);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }
}
