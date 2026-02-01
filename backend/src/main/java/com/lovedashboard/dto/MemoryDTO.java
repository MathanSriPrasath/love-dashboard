package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemoryDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate memoryDate;
    private String imageUrl;
    private String location;
    private String tags;
}

