package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    
    @NotNull(message = "Anniversary date is required")
    private LocalDate anniversaryDate;
    
    @NotBlank(message = "Her name is required")
    private String herName;
    
    @NotNull(message = "Her date of birth is required")
    private LocalDate herDateOfBirth;
    
    private String herBio;
    private String herFavoriteQuote;
    
    @NotBlank(message = "His name is required")
    private String hisName;
    
    @NotNull(message = "His date of birth is required")
    private LocalDate hisDateOfBirth;
    
    private String hisBio;
    private String hisFavoriteQuote;
}

