package com.lovedashboard.repository;

import com.lovedashboard.entity.Memory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, Long> {
    
    /**
     * Find all memories for a specific couple
     */
    List<Memory> findByCoupleIdOrderByMemoryDateDesc(Long coupleId);
}

