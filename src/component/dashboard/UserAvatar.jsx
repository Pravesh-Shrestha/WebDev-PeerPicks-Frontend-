import React from 'react';
import { getRandomColor } from './utils';

const UserAvatar = ({ name, image }) => {
  // If an image URL is provided, show the image
  if (image) {
    return (
      <div className="user-avatar with-image">
        <img src={image} alt={`${name}'s avatar`} />
      </div>
    );
  }
  
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate a consistent color based on the user's name
  const avatarStyle = {
    backgroundColor: getRandomColor(name),
    color: '#ffffff'
  };

  return (
    <div className="user-avatar" style={avatarStyle}>
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;