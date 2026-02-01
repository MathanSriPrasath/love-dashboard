package com.lovedashboard.controller;

import com.lovedashboard.dto.CoupleDTO;
import com.lovedashboard.service.CoupleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
    
    /**
     * PUT /api/couple/{id}/photo
     * Update couple photo URL
     */
    @PutMapping("/{id}/photo")
    public ResponseEntity<CoupleDTO> updateCouplePhoto(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        String photoUrl = request.get("photoUrl");
        CoupleDTO updated = coupleService.updateCouplePhoto(id, photoUrl);
        return ResponseEntity.ok(updated);
    }
}

