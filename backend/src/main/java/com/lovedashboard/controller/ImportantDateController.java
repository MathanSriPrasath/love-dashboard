package com.lovedashboard.controller;

import com.lovedashboard.dto.ImportantDateDTO;
import com.lovedashboard.service.ImportantDateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/important-dates")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ImportantDateController {
    
    private final ImportantDateService importantDateService;
    
    /**
     * GET /api/important-dates/couple/{coupleId}
     * Get all important dates for a couple
     */
    @GetMapping("/couple/{coupleId}")
    public ResponseEntity<List<ImportantDateDTO>> getImportantDatesByCoupleId(@PathVariable Long coupleId) {
        List<ImportantDateDTO> dates = importantDateService.getImportantDatesByCoupleId(coupleId);
        return ResponseEntity.ok(dates);
    }
}

