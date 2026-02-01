package com.lovedashboard.controller;

import com.lovedashboard.dto.CoupleDTO;
import com.lovedashboard.service.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/couple")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CoupleController {
    
    private final CoupleService coupleService;
    
    /**
     * GET /api/couple/{id}
     * Get couple information by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CoupleDTO> getCoupleById(@PathVariable Long id) {
        CoupleDTO couple = coupleService.getCoupleById(id);
        return ResponseEntity.ok(couple);
    }
}

