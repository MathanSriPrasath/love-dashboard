package com.lovedashboard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "couples")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Couple {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "anniversary_date", nullable = false)
    private LocalDate anniversaryDate;
    
    @Column(name = "her_name", nullable = false, length = 100)
    private String herName;
    
    @Column(name = "her_date_of_birth", nullable = false)
    private LocalDate herDateOfBirth;
    
    @Column(name = "her_bio", columnDefinition = "TEXT")
    private String herBio;
    
    @Column(name = "her_favorite_quote", length = 255)
    private String herFavoriteQuote;
    
    @Column(name = "his_name", nullable = false, length = 100)
    private String hisName;
    
    @Column(name = "his_date_of_birth", nullable = false)
    private LocalDate hisDateOfBirth;
    
    @Column(name = "his_bio", columnDefinition = "TEXT")
    private String hisBio;
    
    @Column(name = "his_favorite_quote", length = 255)
    private String hisFavoriteQuote;
    
    @Column(name = "couple_photo_url", length = 500)
    private String couplePhotoUrl;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

