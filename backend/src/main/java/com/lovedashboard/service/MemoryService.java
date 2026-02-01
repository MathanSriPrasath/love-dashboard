package com.lovedashboard.service;

import com.lovedashboard.dto.MemoryDTO;
import com.lovedashboard.entity.Memory;
import com.lovedashboard.repository.MemoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemoryService {
    
    private final MemoryRepository memoryRepository;
    
    /**
     * Get all memories for a couple
     */
    public List<MemoryDTO> getMemoriesByCoupleId(Long coupleId) {
        List<Memory> memories = memoryRepository.findByCoupleIdOrderByMemoryDateDesc(coupleId);
        return memories.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Memory entity to DTO
     */
    private MemoryDTO convertToDTO(Memory memory) {
        return new MemoryDTO(
                memory.getId(),
                memory.getTitle(),
                memory.getDescription(),
                memory.getMemoryDate(),
                memory.getImageUrl(),
                memory.getLocation(),
                memory.getTags()
        );
    }
}

