
import React from 'react';
import { getRandomColor } from './utils';

const UserAvatar = ({ name, size = 'medium' }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const backgroundColor = getRandomColor(name);
  const sizeClass = { small: 'avatar-small', medium: 'avatar-medium', large: 'avatar-large' }[size] || 'avatar-medium';
  return <div className={`user-avatar ${sizeClass}`} style={{ backgroundColor }}>{initial}</div>;
};

export default UserAvatar;
