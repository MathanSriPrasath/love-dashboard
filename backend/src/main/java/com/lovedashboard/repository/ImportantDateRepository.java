package com.lovedashboard.repository;

import com.lovedashboard.entity.ImportantDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImportantDateRepository extends JpaRepository<ImportantDate, Long> {
    
    /**
     * Find all important dates for a specific couple
     */
    List<ImportantDate> findByCoupleIdOrderByEventDateAsc(Long coupleId);
}

