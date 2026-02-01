package com.lovedashboard.service;

import com.lovedashboard.dto.AuthRequest;
import com.lovedashboard.dto.AuthResponse;
import com.lovedashboard.entity.Couple;
import com.lovedashboard.repository.CoupleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final CoupleRepository coupleRepository;
    
    /**
     * Validate authentication credentials
     */
    public AuthResponse authenticate(AuthRequest request) {
        Optional<Couple> coupleOpt = coupleRepository.findByAnniversaryDateAndHerDateOfBirthAndHisDateOfBirth(
                request.getAnniversaryDate(),
                request.getHerDateOfBirth(),
                request.getHisDateOfBirth()
        );
        
        if (coupleOpt.isPresent()) {
            Couple couple = coupleOpt.get();
            return new AuthResponse(
                    true,
                    "Authentication successful",
                    couple.getId()
            );
        } else {
            return new AuthResponse(
                    false,
                    "Invalid credentials. Please check the dates and try again.",
                    null
            );
        }
    }
}

