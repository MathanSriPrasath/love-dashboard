package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoupleDTO {
    private Long id;
    private LocalDate anniversaryDate;
    private String herName;
    private LocalDate herDateOfBirth;
    private String herBio;
    private String herFavoriteQuote;
    private String hisName;
    private LocalDate hisDateOfBirth;
    private String hisBio;
    private String hisFavoriteQuote;
    private String couplePhotoUrl;
}

