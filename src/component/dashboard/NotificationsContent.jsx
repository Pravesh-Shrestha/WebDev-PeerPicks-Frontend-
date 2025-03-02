
import React from 'react';
import UserAvatar from './UserAvatar';

const NotificationsContent = () => {
  return (
    <div className="notifications-content">
      <div className="feed-header">
        <h2>Notifications</h2>
      </div>
      <div className="notification-item">
        <div className="notification-avatar">
          <UserAvatar name="Alex Morgan" size="small" />
        </div>
        <div className="notification-content">
          <p><strong>Alex Morgan</strong> liked your review of Coffee House</p>
          <p className="notification-time">2 hours ago</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsContent;
