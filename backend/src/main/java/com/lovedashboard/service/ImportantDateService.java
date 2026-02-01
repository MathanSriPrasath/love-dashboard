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
     * Convert ImportantDate entity to DTO
     */
    private ImportantDateDTO convertToDTO(ImportantDate date) {
        return new ImportantDateDTO(
                date.getId(),
                date.getTitle(),
                date.getDescription(),
                date.getEventDate(),
                date.getCategory(),
                date.getIsRecurring()
        );
    }
}

