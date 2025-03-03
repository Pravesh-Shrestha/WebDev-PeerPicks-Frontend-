import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faExpandAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from './UserAvatar';
import './css/ReviewCard.css';

// Importing the API functions
import { getUserProfile, getRatingById, updateRating } from '../../API/api'; // Adjust path as needed

const ReviewCard = ({ review }) => {
  // Component state
  const [imageView, setImageView] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(review.saved || false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Effect to get the current logged-in user
  useEffect(() => {
    // Get the current user ID from wherever you store it (localStorage, context, etc.)
    const getCurrentUser = () => {
      // Replace this with how you actually store the current user's ID
      const user = JSON.parse(localStorage.getItem('user'));
      return user?.user_id || null;
    };
    
    setCurrentUserId(getCurrentUser());
  }, []);

  // Helper function to get the image URL
  const getImageUrl = (imagePath) => {
    return `http://localhost:5000/uploads/${imagePath}`;
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle image click for expanded view
  const handleImageClick = (imagePath) => {
    setImageView(imagePath);
  };

  // Close expanded image view
  const closeImageView = () => {
    setImageView(null);
  };

  // Handle the "Save" button click
  const handleSaveClick = async () => {
    // Only allow saving if the current user is the AUTHOR of the review
    if (currentUserId && currentUserId === review.user_id) {
      try {
        // Get the token from local storage or wherever you store it
        const token = localStorage.getItem('token'); // Adjust this based on how you store the token
        
        // First, get the rating by ID using the imported API function
        const ratingData = await getRatingById(review.rating_id, token);
        console.log('Current rating data:', ratingData); // Debug: log current data
        
        // Create a FormData object to update the rating
        const formData = new FormData();
        
        // Add all existing rating data to the FormData
        Object.keys(ratingData).forEach(key => {
          // Skip undefined or null values
          if (ratingData[key] !== undefined && ratingData[key] !== null) {
            // Convert boolean values to strings for FormData
            if (typeof ratingData[key] === 'boolean') {
              formData.append(key, ratingData[key].toString());
            } else {
              formData.append(key, ratingData[key]);
            }
          }
        });
        
        // Update the isSaved field - ensure it's a string "true" or "false" for FormData
        const newSavedState = !isSaved;
        formData.set('isSaved', newSavedState.toString());
        
        console.log('New saved state:', newSavedState); // Debug: log the new state
        
        // Update the rating with the new saved status
        const result = await updateRating(review.rating_id, formData, token);
        console.log('Update result:', result); // Debug: log the response
        
        // Update the UI state
        setIsSaved(newSavedState);
      } catch (error) {
        console.error('Error updating saved status:', error);
      }
    } else {
      console.warn('Save button clicked but user is not the author of the review');
    }
  };

  // Fetch user data based on user_id
  useEffect(() => {
    const fetchUserData = async () => {
      if (!review.user_id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile(review.user_id); // Use the API function without token
        setUserData(data);
        
        // If we have userData and it matches the review's user_id, get the latest saved state
        if (data.user_id === review.user_id) {
          const token = localStorage.getItem('token');
          try {
            const currentRating = await getRatingById(review.rating_id, token);
            if (currentRating && currentRating.isSaved !== undefined) {
              // Make sure we parse the value correctly in case it's a string
              const savedState = 
                typeof currentRating.isSaved === 'string'
                  ? currentRating.isSaved === 'true'
                  : Boolean(currentRating.isSaved);
              
              console.log('Initial saved state from DB:', savedState);
              setIsSaved(savedState);
            }
          } catch (ratingError) {
            console.error('Error fetching rating saved state:', ratingError);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [review.user_id, review.rating_id]); // Added rating_id as dependency

  return (
    <>
      <div className="review-card">
        <div className="review-header">
          {loading ? (
            <div className="avatar-placeholder"></div>
          ) : (
            <UserAvatar 
              name={userData?.username || review.author} 
              image={userData?.profileImage ? getImageUrl(userData.profileImage) : null} 
            />
          )}
          <div className="review-author-info">
            <div className="review-author-name">
              {loading ? 'Loading...' : (userData?.username || review.author)}
            </div>
            {userData?.displayName && (
              <div className="review-author-displayname">
                {userData.displayName}
              </div>
            )}
            <div className="review-date">{formatDate(review.timestamp)}</div>
          </div>
          <div className="review-rating">
            {Array(Math.floor(review.rating))
              .fill()
              .map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
          </div>
        </div>
        
        <div className="review-content">{review.review}</div>
        
        {/* Main review image */}
        {review.ratingImage && (
          <div className="review-image">
            <img
              src={getImageUrl(review.ratingImage)}
              alt="Rating image"
              className="review-rating-image"
              onClick={() => handleImageClick(review.ratingImage)}
            />
            <button 
              className="image-expand-button"
              onClick={() => handleImageClick(review.ratingImage)}
            >
              <FontAwesomeIcon icon={faExpandAlt} />
            </button>
          </div>
        )}

        {/* Additional images gallery */}
        {review.images?.length > 0 && (
          <div className="review-images">
            {review.images.map((img, index) => (
              <div key={index} className="image-container">
                <img
                  src={getImageUrl(img)}
                  alt={`Review image ${index + 1}`}
                  onClick={() => handleImageClick(img)}
                />
                <button 
                  className="image-expand-button"
                  onClick={() => handleImageClick(img)}
                >
                  <FontAwesomeIcon icon={faExpandAlt} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save ribbon with bookmark icon - only visible to the author of the review */}
        {currentUserId && currentUserId === review.user_id && (
          <div 
            className={`save-ribbon ${isSaved ? 'saved' : ''}`}
            onClick={handleSaveClick}
            title={isSaved ? "Unsave" : "Save"}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        )}
      </div>

      {/* Image Lightbox/Modal */}
      {imageView && (
        <div className="image-lightbox" onClick={closeImageView}>
          <div className="lightbox-content">
            <img src={getImageUrl(imageView)} alt="Expanded view" />
            <button className="close-lightbox" onClick={closeImageView}>×</button>
          </div>
        </div>
      )}

      {/* Error message for user data */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </>
  );
};

export default ReviewCard;