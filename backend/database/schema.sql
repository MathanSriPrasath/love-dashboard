-- Love Dashboard Database Schema
-- Run this script to create the database structure

CREATE DATABASE IF NOT EXISTS love_dashboard;
USE love_dashboard;

-- Table 1: couples
CREATE TABLE couples (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    anniversary_date DATE NOT NULL,
    her_name VARCHAR(100) NOT NULL,
    her_date_of_birth DATE NOT NULL,
    her_bio TEXT,
    her_favorite_quote VARCHAR(255),
    his_name VARCHAR(100) NOT NULL,
    his_date_of_birth DATE NOT NULL,
    his_bio TEXT,
    his_favorite_quote VARCHAR(255),
    couple_photo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table 2: love_letters
CREATE TABLE love_letters (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    couple_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(50) NOT NULL COMMENT 'Who wrote this: her_name or his_name',
    letter_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (couple_id) REFERENCES couples(id) ON DELETE CASCADE
);

-- Table 3: memories
CREATE TABLE memories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    couple_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    memory_date DATE NOT NULL,
    image_url VARCHAR(500),
    location VARCHAR(200),
    tags VARCHAR(255) COMMENT 'Comma-separated tags like: vacation,beach,2024',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (couple_id) REFERENCES couples(id) ON DELETE CASCADE
);

-- Table 4: important_dates
CREATE TABLE important_dates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    couple_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    category VARCHAR(50) NOT NULL COMMENT 'birthday, anniversary, special, holiday, etc.',
    is_recurring BOOLEAN DEFAULT FALSE COMMENT 'True if it repeats yearly',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (couple_id) REFERENCES couples(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_love_letters_couple ON love_letters(couple_id);
CREATE INDEX idx_memories_couple ON memories(couple_id);
CREATE INDEX idx_important_dates_couple ON important_dates(couple_id);
CREATE INDEX idx_important_dates_event ON important_dates(event_date);

