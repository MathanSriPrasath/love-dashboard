import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">💕 Love Dashboard</h3>
          <p className="footer-tagline">Celebrating love, one moment at a time</p>
        </div>
        
        <div className="footer-section">
          <h4>About</h4>
          <p className="footer-description">
            A beautiful space for couples to cherish their memories, 
            declarations of love, and important moments together.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul className="footer-links">
            <li>📝 Declarations of Love</li>
            <li>📸 Memories Gallery</li>
            <li>📅 Important Dates</li>
            <li>🖼️ Photo Upload</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} Love Dashboard. Made with 🖤 for couples everywhere.
        </p>
        <p className="footer-note">
          Your love story, beautifully preserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

