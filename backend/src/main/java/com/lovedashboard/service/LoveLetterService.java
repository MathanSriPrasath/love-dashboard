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
     * Create a new love letter
     */
    public LoveLetterDTO createLoveLetter(LoveLetterDTO dto) {
        LoveLetter letter = new LoveLetter();
        letter.setCoupleId(dto.getCoupleId());
        letter.setTitle(dto.getTitle());
        letter.setContent(dto.getContent());
        letter.setAuthor(dto.getAuthor());
        letter.setLetterDate(dto.getLetterDate());
        
        LoveLetter saved = loveLetterRepository.save(letter);
        return convertToDTO(saved);
    }
    
    /**
     * Delete a love letter
     */
    public void deleteLoveLetter(Long id) {
        loveLetterRepository.deleteById(id);
    }
    
    /**
     * Convert LoveLetter entity to DTO
     */
    private LoveLetterDTO convertToDTO(LoveLetter letter) {
        LoveLetterDTO dto = new LoveLetterDTO();
        dto.setId(letter.getId());
        dto.setCoupleId(letter.getCoupleId());
        dto.setTitle(letter.getTitle());
        dto.setContent(letter.getContent());
        dto.setAuthor(letter.getAuthor());
        dto.setLetterDate(letter.getLetterDate());
        return dto;
    }
}

