package com.lovedashboard.service;

import com.lovedashboard.dto.AuthRequest;
import com.lovedashboard.dto.AuthResponse;
import com.lovedashboard.dto.SignupRequest;
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
    
    /**
     * Register a new couple
     */
    public AuthResponse registerCouple(SignupRequest request) {
        // Check if couple already exists
        Optional<Couple> existingCouple = coupleRepository.findByAnniversaryDateAndHerDateOfBirthAndHisDateOfBirth(
                request.getAnniversaryDate(),
                request.getHerDateOfBirth(),
                request.getHisDateOfBirth()
        );
        
        if (existingCouple.isPresent()) {
            return new AuthResponse(
                    false,
                    "A couple with these dates already exists. Please login instead.",
                    null
            );
        }
        
        // Create new couple
        Couple couple = new Couple();
        couple.setAnniversaryDate(request.getAnniversaryDate());
        couple.setHerName(request.getHerName());
        couple.setHerDateOfBirth(request.getHerDateOfBirth());
        couple.setHerBio(request.getHerBio());
        couple.setHerFavoriteQuote(request.getHerFavoriteQuote());
        couple.setHisName(request.getHisName());
        couple.setHisDateOfBirth(request.getHisDateOfBirth());
        couple.setHisBio(request.getHisBio());
        couple.setHisFavoriteQuote(request.getHisFavoriteQuote());
        
        Couple savedCouple = coupleRepository.save(couple);
        
        return new AuthResponse(
                true,
                "Registration successful! Welcome to Love Dashboard.",
                savedCouple.getId()
        );
    }
    
    /**
     * Check if couple exists
     */
    public boolean coupleExists(AuthRequest request) {
        Optional<Couple> coupleOpt = coupleRepository.findByAnniversaryDateAndHerDateOfBirthAndHisDateOfBirth(
                request.getAnniversaryDate(),
                request.getHerDateOfBirth(),
                request.getHisDateOfBirth()
        );
        return coupleOpt.isPresent();
    }
}

