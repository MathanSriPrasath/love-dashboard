package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportantDateDTO {
    private Long id;
    private Long coupleId;
    private String title;
    private String description;
    private LocalDate eventDate;
    private String category;
    private Boolean isRecurring;
}

