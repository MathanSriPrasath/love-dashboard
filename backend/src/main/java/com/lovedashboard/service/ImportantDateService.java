package com.lovedashboard.service;

import com.lovedashboard.dto.ImportantDateDTO;
import com.lovedashboard.entity.ImportantDate;
import com.lovedashboard.repository.ImportantDateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImportantDateService {
    
    private final ImportantDateRepository importantDateRepository;
    
    /**
     * Get all important dates for a couple
     */
    public List<ImportantDateDTO> getImportantDatesByCoupleId(Long coupleId) {
        List<ImportantDate> dates = importantDateRepository.findByCoupleIdOrderByEventDateAsc(coupleId);
        return dates.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Create a new important date
     */
    public ImportantDateDTO createImportantDate(ImportantDateDTO dto) {
        ImportantDate date = new ImportantDate();
        date.setCoupleId(dto.getCoupleId());
        date.setTitle(dto.getTitle());
        date.setDescription(dto.getDescription());
        date.setEventDate(dto.getEventDate());
        date.setCategory(dto.getCategory());
        date.setIsRecurring(dto.getIsRecurring() != null ? dto.getIsRecurring() : false);
        
        ImportantDate saved = importantDateRepository.save(date);
        return convertToDTO(saved);
    }
    
    /**
     * Delete an important date
     */
    public void deleteImportantDate(Long id) {
        importantDateRepository.deleteById(id);
    }
    
    /**
     * Convert ImportantDate entity to DTO
     */
    private ImportantDateDTO convertToDTO(ImportantDate date) {
        ImportantDateDTO dto = new ImportantDateDTO();
        dto.setId(date.getId());
        dto.setCoupleId(date.getCoupleId());
        dto.setTitle(date.getTitle());
        dto.setDescription(date.getDescription());
        dto.setEventDate(date.getEventDate());
        dto.setCategory(date.getCategory());
        dto.setIsRecurring(date.getIsRecurring());
        return dto;
    }
}

