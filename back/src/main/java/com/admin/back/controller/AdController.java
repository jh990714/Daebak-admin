package com.admin.back.controller;

import com.admin.back.dto.AdDto;
import com.admin.back.service.service.AdService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ads")
@RequiredArgsConstructor
public class AdController {
    private final AdService adService;

    @GetMapping
    public ResponseEntity<List<AdDto>> getAds() {
        List<AdDto> ads = adService.getAds();
        return ResponseEntity.ok(ads);
    }

    @PostMapping
    public ResponseEntity<AdDto> createAd(
            @ModelAttribute AdDto adDto,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        AdDto createdAd = adService.createAd(adDto, image);
        return ResponseEntity.ok(createdAd);
    }

    @PutMapping
    public ResponseEntity<AdDto> updateAd(
            @ModelAttribute AdDto adDto,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        AdDto updatedAd = adService.updateAd(adDto, image);
        return ResponseEntity.ok(updatedAd);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) throws IOException {
        adService.deleteAd(id);
        return ResponseEntity.noContent().build();
    }
}
