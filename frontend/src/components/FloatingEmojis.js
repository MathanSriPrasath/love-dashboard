import React from 'react';
import './FloatingEmojis.css';

const FloatingEmojis = ({ herName, hisName }) => {
  // Only hearts and roses - more frequently
  const emojis = ['🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹', '🖤', '🌹'];
  
  // Create couple name elements if names are provided
  const coupleNames = herName && hisName 
    ? Array(8).fill(`${herName} 🖤 ${hisName}`) 
    : [];
  
  // Combine emojis and couple names
  const floatingItems = [...emojis, ...coupleNames];
  
  return (
    <div className="floating-emojis-container">
      {floatingItems.map((item, index) => {
        const isCoupleNameFloat = item.includes('🖤') && (herName || hisName);
        
        return (
          <div
            key={index}
            className={isCoupleNameFloat ? 'floating-couple-name' : 'floating-emoji'}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 10}s`,
              fontSize: isCoupleNameFloat ? `${18 + Math.random() * 12}px` : `${25 + Math.random() * 35}px`,
              opacity: isCoupleNameFloat ? 0.2 + Math.random() * 0.15 : 0.15 + Math.random() * 0.2,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingEmojis;

