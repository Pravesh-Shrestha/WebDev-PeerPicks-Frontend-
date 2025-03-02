import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBookmark, faBell, faUser, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from './UserAvatar';
import { useNavigate } from 'react-router-dom'; // For navigation

const Sidebar = ({ activeTab, setActiveTab, notifications, setShowAddReviewModal, userHandle }) => {
  const [userName, setUserName] = useState('');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // State for showing confirmation
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName'); // Remove user data
    navigate('/login'); // Redirect to login page
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false); // Hide the confirmation modal
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">P</div>
        <h1>PeerPicks</h1>
      </div>
      <div className="menu-items">
        <a
          className={`menu-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </a>
        <a
          className={`menu-item ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <FontAwesomeIcon icon={faBookmark} />
          <span>Saved</span>
        </a>
        <a
          className={`menu-item ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
          {notifications > 0 && <div className="notification-indicator">{notifications}</div>}
        </a>
        <a
          className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </a>
        <button className="logout-btn" onClick={() => setShowLogoutConfirmation(true)}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
      </button>
      </div>
      <button className="add-review-btn" onClick={() => setShowAddReviewModal(true)}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Add Review</span>
      </button>
      <div className="profile-section">
        <UserAvatar name={userName} />
        <div className="profile-info">
          <div className="profile-name">{userName}</div>
          <div className="profile-handle">{userHandle}</div>
        </div>
      </div>
    

      {/* Confirmation Modal */}
      {showLogoutConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button className="cancell-btn" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
