
import React from 'react';
import UserAvatar from './UserAvatar';

const ProfileContent = ({ setShowAddReviewModal, userName, userHandle }) => {
  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-details">
          <div className="profile-avatar">
            <UserAvatar name={userName} size="large" />
          </div>
          <div className="profile-text">
            <h2>{userName}</h2>
            <p className="profile-handle">{userHandle}</p>
            <p className="profile-bio">Food enthusiast. Always on the hunt for the next great restaurant.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
