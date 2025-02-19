import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulating login functionality
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser({
      username: "user123",
      avatar: "U"
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <header className={`header ${scrollPosition > 50 ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-icon">⭐</span>
            <h1>PeerPicks</h1>
          </Link>
        </div>
        
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <nav className={`navigation ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/why-us" onClick={() => setIsMenuOpen(false)}>Why Us?</Link></li>
            <li><Link to="/top-ratings" onClick={() => setIsMenuOpen(false)}>Top Ratings</Link></li>
            <li><Link to="/rate-now" className="cta-nav-button" onClick={() => setIsMenuOpen(false)}>Rate Now</Link></li>
            <li><Link to="/faqs" onClick={() => setIsMenuOpen(false)}>FAQs</Link></li>
          </ul>
        </nav>
        
        <div className="user-actions">
          {isLoggedIn ? (
            <div className="user-profile">
              <div className="user-avatar">{currentUser.avatar}</div>
              <div className="user-dropdown">
                <span className="username">{currentUser.username}</span>
                <div className="dropdown-content">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/my-reviews">My Reviews</Link>
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-button" onClick={handleLogin}>Log In</button>
              <Link to="/signup" className="signup-button">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;