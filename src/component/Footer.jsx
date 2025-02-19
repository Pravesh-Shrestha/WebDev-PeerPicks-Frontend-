import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">⭐</span>
            <h2>PeerPicks</h2>
          </div>
          <p>Empowering users through community-based ratings and authentic reviews.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="social-icon facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="social-icon twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="social-icon instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="social-icon linkedin"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>Navigate</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/why-us">Why PeerPicks?</Link></li>
              <li><Link to="/top-ratings">Top Ratings</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/category/restaurants">Restaurants</Link></li>
              <li><Link to="/category/shopping">Shopping</Link></li>
              <li><Link to="/category/services">Services</Link></li>
              <li><Link to="/category/entertainment">Entertainment</Link></li>
              <li><Link to="/category/health">Health & Wellness</Link></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h3>Support</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/report">Report an Issue</Link></li>
              <li><Link to="/business-owners">For Business Owners</Link></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/guidelines">Community Guidelines</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="subscribe-section">
        <div className="subscribe-container">
          <div className="subscribe-text">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest ratings and community insights.</p>
          </div>
          <form className="subscribe-form">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} PeerPicks. All rights reserved.</p>
        <div className="footer-app-links">
          <a href="#" className="app-button">
            <span className="app-icon">📱</span>
            <span className="app-text">Get our App</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;