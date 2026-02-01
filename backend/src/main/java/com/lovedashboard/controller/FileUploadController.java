package com.lovedashboard.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FileUploadController {
    
    // Upload directory - will be created in backend folder
    private static final String UPLOAD_DIR = "uploads/images/";
    
    /**
     * Upload couple photo
     * POST /api/upload/couple-photo
     */
    @PostMapping("/couple-photo")
    public ResponseEntity<Map<String, String>> uploadCouplePhoto(
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }
            
            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || 
                (!contentType.equals("image/jpeg") && 
                 !contentType.equals("image/jpg") && 
                 !contentType.equals("image/png"))) {
                throw new RuntimeException("Only JPG and PNG images are allowed");
            }
            
            // Check file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new RuntimeException("File size must be less than 5MB");
            }
            
            // Create upload directory if it doesn't exist
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = "couple_" + UUID.randomUUID().toString() + fileExtension;
            
            // Save file
            Path filePath = Paths.get(UPLOAD_DIR + newFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Return file URL
            String fileUrl = "/uploads/images/" + newFilename;
            
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("filename", newFilename);
            response.put("message", "File uploaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }
    }
    
    /**
     * Upload memory photo
     * POST /api/upload/memory-photo
     */
    @PostMapping("/memory-photo")
    public ResponseEntity<Map<String, String>> uploadMemoryPhoto(
            @RequestParam("file") MultipartFile file) {
        
        try {
            // Validate file
            if (file.isEmpty()) {
                throw new RuntimeException("File is empty");
            }
            
            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || 
                (!contentType.equals("image/jpeg") && 
                 !contentType.equals("image/jpg") && 
                 !contentType.equals("image/png"))) {
                throw new RuntimeException("Only JPG and PNG images are allowed");
            }
            
            // Check file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new RuntimeException("File size must be less than 5MB");
            }
            
            // Create upload directory if it doesn't exist
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = "memory_" + UUID.randomUUID().toString() + fileExtension;
            
            // Save file
            Path filePath = Paths.get(UPLOAD_DIR + newFilename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Return file URL
            String fileUrl = "/uploads/images/" + newFilename;
            
            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            response.put("filename", newFilename);
            response.put("message", "File uploaded successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }
    }
}

