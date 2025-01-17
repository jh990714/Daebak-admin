package com.admin.back.service.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.admin.back.dto.PromotionalVideoDto;

public interface PromotionalVideoService {

    List<PromotionalVideoDto> getPromotionalVideo();

    PromotionalVideoDto updatePromotionalVideo(MultipartFile image, PromotionalVideoDto promotionalVideo);

    PromotionalVideoDto createPromotionalVideo(MultipartFile video, PromotionalVideoDto promotionalVideo);

   void deletePromotionalVideo(Long id) throws IOException;
    
}
