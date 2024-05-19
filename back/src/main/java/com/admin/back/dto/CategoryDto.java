package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    private String name;
    private List<SubcategoryDTO> subcategories;

    @Getter
    @Setter
    public static class SubcategoryDTO {
        private Long id;
        private String name;
        
    }
}
