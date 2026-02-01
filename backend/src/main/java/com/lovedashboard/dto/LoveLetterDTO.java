package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoveLetterDTO {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDate letterDate;
}

