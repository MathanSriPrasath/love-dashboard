package com.lovedashboard.controller;

import com.lovedashboard.dto.AuthRequest;
import com.lovedashboard.dto.AuthResponse;
import com.lovedashboard.dto.SignupRequest;
import com.lovedashboard.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * POST /api/auth/login
     * Authenticate using anniversary date and birth dates
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }
    
    /**
     * POST /api/auth/signup
     * Register a new couple
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        AuthResponse response = authService.registerCouple(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * POST /api/auth/check-exists
     * Check if a couple already exists with given dates
     */
    @PostMapping("/check-exists")
    public ResponseEntity<Boolean> checkCoupleExists(@RequestBody AuthRequest request) {
        boolean exists = authService.coupleExists(request);
        return ResponseEntity.ok(exists);
    }
}

