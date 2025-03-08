package com.admin.back.service.implement;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.AdDto;
import com.admin.back.entity.AdEntity;
import com.admin.back.repository.AdRepository;
import com.admin.back.service.service.AdService;
import com.admin.back.service.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdServiceImpl implements AdService {

    private final AdRepository adRepository;
    private final S3Service s3Service;

    @Override
    @Transactional(readOnly = true)
    public List<AdDto> getAds() {
        return adRepository.findAll().stream()
                .map(AdDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AdDto createAd(AdDto adDto, MultipartFile image) throws IOException {
        String imageUrl = processImage(image);
        if (imageUrl != null) {
            adDto.setImageUrl(imageUrl);
        }

        AdEntity adEntity = AdEntity.builder()
                .imageUrl(adDto.getImageUrl())
                .linkUrl(adDto.getLinkUrl())
                .startDate(adDto.getStartDate())
                .endDate(adDto.getEndDate())
                .build();

        return AdDto.fromEntity(adRepository.save(adEntity));
    }

    @Override
    @Transactional
    public AdDto updateAd(AdDto adDto, MultipartFile image) throws IOException {
        AdEntity existingAd = adRepository.findById(adDto.getAdId())
                .orElseThrow(() -> new IllegalArgumentException("Ad not found with id: " + adDto.getAdId()));

        String imageUrl = processImage(image);
        if (imageUrl != null) {
            existingAd.setImageUrl(imageUrl);
        }

        existingAd.setLinkUrl(adDto.getLinkUrl());
        existingAd.setStartDate(adDto.getStartDate());
        existingAd.setEndDate(adDto.getEndDate());

        return AdDto.fromEntity(adRepository.save(existingAd));
    }

    @Override
    @Transactional
    public void deleteAd(Long id) throws IOException {
        AdEntity existingAd = adRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ad not found with id: " + id));

        String imageUrl = existingAd.getImageUrl();
        if (imageUrl != null && !imageUrl.isEmpty()) {
            s3Service.deleteImageFromS3(imageUrl);
        }

        adRepository.deleteById(id);
    }

    private String processImage(MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            return s3Service.saveImageToS3(image, "ad/");
        }
        return null;
    }
}
