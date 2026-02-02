import React from 'react';
import './FloatingEmojis.css';

const FloatingEmojis = () => {
  // Only hearts and roses - more frequently
  const emojis = ['🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹'];
  
  return (
    <div className="floating-emojis-container">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${12 + Math.random() * 8}s`,
            fontSize: `${25 + Math.random() * 35}px`,
            opacity: 0.15 + Math.random() * 0.2,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmojis;

