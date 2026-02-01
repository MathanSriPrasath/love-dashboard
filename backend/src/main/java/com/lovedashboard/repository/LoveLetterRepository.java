package com.lovedashboard.repository;

import com.lovedashboard.entity.LoveLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoveLetterRepository extends JpaRepository<LoveLetter, Long> {
    
    /**
     * Find all love letters for a specific couple
     */
    List<LoveLetter> findByCoupleIdOrderByLetterDateDesc(Long coupleId);
}

