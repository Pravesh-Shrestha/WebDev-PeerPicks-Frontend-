
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeFeed from './HomeFeed';
import ProfileContent from './ProfileContent';
import NotificationsContent from './NotificationsContent';
import AddReviewModal from './AddReviewModal';
import '../../styles/Dashboard.css'


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [reviewText, setReviewText] = useState('');
  const [reviewImages, setReviewImages] = useState([]);
  const [userName, setUserName] = useState('Your Name');
  const [userHandle, setUserHandle] = useState('@yourhandle');

  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} notifications={notifications} setShowAddReviewModal={setShowAddReviewModal} userName={userName} userHandle={userHandle} />
      <div className="main-content">
        {activeTab === 'home' && <HomeFeed reviews={[]} />}
        {activeTab === 'profile' && <ProfileContent setShowAddReviewModal={setShowAddReviewModal} userName={userName} userHandle={userHandle} />}
        {activeTab === 'notifications' && <NotificationsContent />}
      </div>
      {showAddReviewModal && <AddReviewModal setShowAddReviewModal={setShowAddReviewModal} reviewText={reviewText} setReviewText={setReviewText} reviewImages={reviewImages} setReviewImages={setReviewImages} />}
    </div>
  );
};

export default Dashboard;
