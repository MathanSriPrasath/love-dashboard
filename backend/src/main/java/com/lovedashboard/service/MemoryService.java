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
     * Create a new memory
     */
    public MemoryDTO createMemory(MemoryDTO dto) {
        Memory memory = new Memory();
        memory.setCoupleId(dto.getCoupleId());
        memory.setTitle(dto.getTitle());
        memory.setDescription(dto.getDescription());
        memory.setMemoryDate(dto.getMemoryDate());
        memory.setImageUrl(dto.getImageUrl());
        memory.setLocation(dto.getLocation());
        memory.setTags(dto.getTags());
        
        Memory saved = memoryRepository.save(memory);
        return convertToDTO(saved);
    }
    
    /**
     * Delete a memory
     */
    public void deleteMemory(Long id) {
        memoryRepository.deleteById(id);
    }
    
    /**
     * Convert Memory entity to DTO
     */
    private MemoryDTO convertToDTO(Memory memory) {
        MemoryDTO dto = new MemoryDTO();
        dto.setId(memory.getId());
        dto.setCoupleId(memory.getCoupleId());
        dto.setTitle(memory.getTitle());
        dto.setDescription(memory.getDescription());
        dto.setMemoryDate(memory.getMemoryDate());
        dto.setImageUrl(memory.getImageUrl());
        dto.setLocation(memory.getLocation());
        dto.setTags(memory.getTags());
        return dto;
    }
}

