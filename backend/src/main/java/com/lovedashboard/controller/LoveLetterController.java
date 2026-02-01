package com.lovedashboard.controller;

import com.lovedashboard.dto.LoveLetterDTO;
import com.lovedashboard.service.LoveLetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/love-letters")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class LoveLetterController {
    
    private final LoveLetterService loveLetterService;
    
    /**
     * GET /api/love-letters/couple/{coupleId}
     * Get all love letters for a couple
     */
    @GetMapping("/couple/{coupleId}")
    public ResponseEntity<List<LoveLetterDTO>> getLoveLettersByCoupleId(@PathVariable Long coupleId) {
        List<LoveLetterDTO> letters = loveLetterService.getLoveLettersByCoupleId(coupleId);
        return ResponseEntity.ok(letters);
    }
}

