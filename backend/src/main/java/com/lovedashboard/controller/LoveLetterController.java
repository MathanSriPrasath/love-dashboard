package com.lovedashboard.controller;

import com.lovedashboard.dto.LoveLetterDTO;
import com.lovedashboard.service.LoveLetterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    
    /**
     * POST /api/love-letters
     * Create a new love letter
     */
    @PostMapping
    public ResponseEntity<LoveLetterDTO> createLoveLetter(@RequestBody LoveLetterDTO loveLetterDTO) {
        LoveLetterDTO created = loveLetterService.createLoveLetter(loveLetterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    /**
     * DELETE /api/love-letters/{id}
     * Delete a love letter
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoveLetter(@PathVariable Long id) {
        loveLetterService.deleteLoveLetter(id);
        return ResponseEntity.noContent().build();
    }
}

