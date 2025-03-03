import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HomeFeed from './HomeFeed';
import ProfileContent from './ProfileContent';
import NotificationsContent from './NotificationsContent';
import AddReviewModal from './AddReviewModal';
import { addRating } from '../../API/api'; // Import the addRating function
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userName, setUserName] = useState('Your Name');
  const [userHandle, setUserHandle] = useState('@yourhandle');
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Load user info from localStorage on component mount
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setCurrentUser(user);
          setUserName(user.username || 'Your Name');
          setUserHandle(user.displayName || '@yourhandle');
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };
    
    loadUserInfo();
  }, []);

  // Function to handle review submission
  const handleAddReview = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      
      // Make sure user_id is included in the formData
      if (currentUser && currentUser.user_id) {
        formData.append('user_id', currentUser.user_id);
      } else {
        throw new Error('User not logged in or user_id not available');
      }
      
      console.log('FormData before submission:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      // Make API call to add the rating
      const result = await addRating(formData, token);
      
      // Show success message (optional)
      alert('Review submitted successfully!');
      
      // Refresh the reviews list if needed
      // You might want to call a function to reload reviews here
      
      return result;
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review: ' + error.message);
      throw error;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notifications={notifications} 
        setShowAddReviewModal={setShowAddReviewModal} 
        userName={userName} 
        userHandle={userHandle} 
      />
      <div className="main-content">
        <Header notifications={notifications} />
        {activeTab === 'home' && <HomeFeed reviews={reviews} />}
        {activeTab === 'profile' && (
          <ProfileContent 
            setShowAddReviewModal={setShowAddReviewModal} 
            userName={userName} 
            userHandle={userHandle} 
          />
        )}
        {activeTab === 'notifications' && <NotificationsContent />}
      </div>
      
      {showAddReviewModal && (
        <AddReviewModal 
          setShowAddReviewModal={setShowAddReviewModal} 
          handleAddReview={handleAddReview} 
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Dashboard;