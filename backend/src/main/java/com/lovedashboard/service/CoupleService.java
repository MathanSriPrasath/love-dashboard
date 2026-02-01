package com.lovedashboard.service;

import com.lovedashboard.dto.CoupleDTO;
import com.lovedashboard.entity.Couple;
import com.lovedashboard.repository.CoupleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoupleService {
    
    private final CoupleRepository coupleRepository;
    
    /**
     * Get couple information by ID
     */
    public CoupleDTO getCoupleById(Long coupleId) {
        Couple couple = coupleRepository.findById(coupleId)
                .orElseThrow(() -> new RuntimeException("Couple not found with id: " + coupleId));
        
        return convertToDTO(couple);
    }
    
    /**
     * Convert Couple entity to DTO
     */
    private CoupleDTO convertToDTO(Couple couple) {
        return new CoupleDTO(
                couple.getId(),
                couple.getAnniversaryDate(),
                couple.getHerName(),
                couple.getHerDateOfBirth(),
                couple.getHerBio(),
                couple.getHerFavoriteQuote(),
                couple.getHisName(),
                couple.getHisDateOfBirth(),
                couple.getHisBio(),
                couple.getHisFavoriteQuote(),
                couple.getCouplePhotoUrl()
        );
    }
}

