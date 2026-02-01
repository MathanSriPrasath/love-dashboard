package com.lovedashboard.controller;

import com.lovedashboard.dto.MemoryDTO;
import com.lovedashboard.service.MemoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MemoryController {
    
    private final MemoryService memoryService;
    
    /**
     * GET /api/memories/couple/{coupleId}
     * Get all memories for a couple
     */
    @GetMapping("/couple/{coupleId}")
    public ResponseEntity<List<MemoryDTO>> getMemoriesByCoupleId(@PathVariable Long coupleId) {
        List<MemoryDTO> memories = memoryService.getMemoriesByCoupleId(coupleId);
        return ResponseEntity.ok(memories);
    }
}

