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
    private Long coupleId;
    private String title;
    private String content;
    private String author;
    private LocalDate letterDate;
    
    // Constructor without id (for creating new letters)
    public LoveLetterDTO(String title, String content, String author, LocalDate letterDate) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.letterDate = letterDate;
    }
}

