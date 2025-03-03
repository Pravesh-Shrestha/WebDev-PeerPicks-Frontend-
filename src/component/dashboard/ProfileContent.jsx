import React, { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReviewCard from './ReviewCard';
import { getAllRatings, deleteRating } from '../../API/api'; // Adjust path as needed
import './css/ProfileContentCss.css'

const ProfileContent = ({ setShowAddReviewModal, userName, userHandle }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch the current user ID
  useEffect(() => {
    const getCurrentUser = () => {
      // Replace this with how you actually store the current user's ID
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.user_id || null;
    };
    
    setCurrentUserId(getCurrentUser());
  }, []);

  // Fetch all ratings for the current user
  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!currentUserId) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        // Get all ratings
        const ratings = await getAllRatings(token);
        
        // Filter ratings to only include those by the current user
        const userReviews = ratings.filter(rating => rating.user_id === currentUserId);
        
        setUserReviews(userReviews);
      } catch (err) {
        console.error('Error fetching user reviews:', err);
        setError('Failed to load your reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [currentUserId]);

  // Handle deleting a review
  const handleDeleteReview = async (ratingId) => {
    // Confirm deletion with the user
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await deleteRating(ratingId, token);
      
      // Remove the deleted review from state
      setUserReviews(userReviews.filter(review => review.rating_id !== ratingId));
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review. Please try again.');
    }
  };

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
      
      {/* Reviews Section */}
      <div className="profile-reviews-section">
        <div className="section-header">
          <h3>My Reviews</h3>
          <button 
            className="add-review-button"
            onClick={() => setShowAddReviewModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Review
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            <p>Loading your reviews...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : userReviews.length === 0 ? (
          <div className="no-reviews">
            <p>You haven't posted any reviews yet.</p>
            <button
              className="start-reviewing-button"
              onClick={() => setShowAddReviewModal(true)}
            >
              Start Reviewing
            </button>
          </div>
        ) : (
          <div className="reviews-container">
            {userReviews.map(review => (
              <div key={review.rating_id} className="review-item">
                <ReviewCard review={review} />
                <button
                  className="delete-review-button"
                  onClick={() => handleDeleteReview(review.rating_id)}
                  title="Delete this review"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;