package com.lovedashboard.repository;

import com.lovedashboard.entity.Couple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CoupleRepository extends JpaRepository<Couple, Long> {
    
    /**
     * Find couple by authentication credentials
     */
    Optional<Couple> findByAnniversaryDateAndHerDateOfBirthAndHisDateOfBirth(
            LocalDate anniversaryDate, 
            LocalDate herDateOfBirth, 
            LocalDate hisDateOfBirth
    );
}

