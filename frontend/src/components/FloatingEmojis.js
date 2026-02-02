import React from 'react';
import './FloatingEmojis.css';

const FloatingEmojis = () => {
  // Love emojis to display
  const emojis = ['🖤', '💋', '🍫', '💌', '🖤', '🌹', '💋', '🍫', '💝', '🖤', '💋', '🍫', '💌', '🖤', '🌹'];
  
  return (
    <div className="floating-emojis-container">
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            fontSize: `${20 + Math.random() * 30}px`,
            opacity: 0.15 + Math.random() * 0.15,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmojis;

