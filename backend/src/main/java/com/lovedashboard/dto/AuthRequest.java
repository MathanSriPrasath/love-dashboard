package com.lovedashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    
    @NotNull(message = "Anniversary date is required")
    private LocalDate anniversaryDate;
    
    @NotNull(message = "Her date of birth is required")
    private LocalDate herDateOfBirth;
    
    @NotNull(message = "His date of birth is required")
    private LocalDate hisDateOfBirth;
}

