import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar, faImage, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { getAllBusinesses } from '../../API/api'; // Adjust path as needed

const AddReviewModal = ({ 
  setShowAddReviewModal, 
  handleAddReview,
  currentUser
}) => {
  // State for the review form
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [businessOptions, setBusinessOptions] = useState([]);
  const [reviewImage, setReviewImage] = useState(null);
  const [reviewImagePreview, setReviewImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch businesses for dropdown
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const businesses = await getAllBusinesses();
        setBusinessOptions(businesses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError('Failed to load businesses. Please try again.');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // Handle file selection for review image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or GIF).');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setReviewImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setReviewImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Clear any previous errors
    setError(null);
  };

  // Remove the selected image
  const removeImage = () => {
    setReviewImage(null);
    setReviewImagePreview(null);
  };

  // Submit the review
  const submitReview = async () => {
    // Validation
    if (!selectedBusiness) {
      setError('Please select a business to review.');
      return;
    }

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }

    if (!reviewText.trim()) {
      setError('Please enter your review.');
      return;
    }

    if (!currentUser || !currentUser.user_id) {
      setError('You must be logged in to submit a review.');
      return;
    }

    setLoading(true);

    try {
      // Create form data to include the image
      const formData = new FormData();
      formData.append('business_id', selectedBusiness);
      formData.append('rating', rating);
      formData.append('review', reviewText);
      
      // Make sure to include user_id - this is crucial
      formData.append('user_id', currentUser.user_id);
      
      if (reviewImage) {
        formData.append('ratingImage', reviewImage);
      }

      // For debugging - log what we're submitting
      console.log('Submitting review with:');
      console.log('- Business ID:', selectedBusiness);
      console.log('- Rating:', rating);
      console.log('- User ID:', currentUser.user_id);

      // Call the parent component's handler with the formData
      await handleAddReview(formData);
      
      // Close the modal on success
      setShowAddReviewModal(false);
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to submit review: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a Review</h2>
          <button 
            className="close-modal" 
            onClick={() => setShowAddReviewModal(false)}
            disabled={loading}
          >
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          {/* Business selection dropdown */}
          <div className="form-group">
            <label htmlFor="business-select">Select a Business to Review</label>
            <select 
              id="business-select"
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
              disabled={loading}
              className="business-select"
            >
              <option value="">-- Select a Business --</option>
              {businessOptions.map(business => (
                <option key={business.business_id} value={business.business_id}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Star rating section */}
          <div className="form-group">
            <label>Your Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className="star-icon"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <FontAwesomeIcon 
                    icon={star <= (hoveredRating || rating) ? faStar : faStarRegular} 
                    className={star <= (hoveredRating || rating) ? 'star-filled' : 'star-empty'} 
                  />
                </span>
              ))}
            </div>
          </div>
          
          {/* Review text area */}
          <div className="form-group">
            <label htmlFor="review-text">Your Review</label>
            <textarea
              id="review-text"
              className="review-textarea"
              placeholder="Share your experience with this business..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              disabled={loading}
              rows={5}
            />
          </div>
          
          {/* Image upload section */}
          <div className="form-group">
            <label>Add a Photo (Optional)</label>
            <div className="image-upload-container">
              {!reviewImagePreview ? (
                <label className="image-upload-label">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    disabled={loading}
                    className="file-input"
                  />
                  <FontAwesomeIcon icon={faImage} className="upload-icon" />
                  <span>Click to upload an image</span>
                </label>
              ) : (
                <div className="image-preview-container">
                  <img 
                    src={reviewImagePreview} 
                    alt="Review preview" 
                    className="image-preview" 
                  />
                  <button 
                    onClick={removeImage} 
                    className="remove-image"
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button 
            className="cancel-button" 
            onClick={() => setShowAddReviewModal(false)}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="submit-button" 
            onClick={submitReview}
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;