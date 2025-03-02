
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

const Header = ({ notifications }) => {
  return (
    <div className="header">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search PeerPicks" />
      </div>
      <div className="header-actions">
        <div className="header-icon">
          <FontAwesomeIcon icon={faBell} />
          {notifications > 0 && <div className="notification-indicator small">{notifications}</div>}
        </div>
        <div className="header-icon">
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
    </div>
  );
};

export default Header;
