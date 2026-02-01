package com.lovedashboard.service;

import com.lovedashboard.dto.LoveLetterDTO;
import com.lovedashboard.entity.LoveLetter;
import com.lovedashboard.repository.LoveLetterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoveLetterService {
    
    private final LoveLetterRepository loveLetterRepository;
    
    /**
     * Get all love letters for a couple
     */
    public List<LoveLetterDTO> getLoveLettersByCoupleId(Long coupleId) {
        List<LoveLetter> letters = loveLetterRepository.findByCoupleIdOrderByLetterDateDesc(coupleId);
        return letters.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert LoveLetter entity to DTO
     */
    private LoveLetterDTO convertToDTO(LoveLetter letter) {
        return new LoveLetterDTO(
                letter.getId(),
                letter.getTitle(),
                letter.getContent(),
                letter.getAuthor(),
                letter.getLetterDate()
        );
    }
}

