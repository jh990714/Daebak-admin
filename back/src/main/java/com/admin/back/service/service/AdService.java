package com.admin.back.service.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.AdDto;

public interface AdService {
    List<AdDto> getAds();
    public AdDto createAd(AdDto adDto, MultipartFile image) throws IOException;
    void deleteAd(Long id) throws IOException;
    AdDto updateAd(AdDto adDto, MultipartFile image) throws IOException;
}
