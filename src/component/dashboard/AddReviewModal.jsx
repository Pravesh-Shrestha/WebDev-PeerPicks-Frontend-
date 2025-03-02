
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from './UserAvatar';

const AddReviewModal = ({ setShowAddReviewModal, reviewText, setReviewText, reviewImages, setReviewImages, handleAddReview, handleFileChange, userName }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add a Review</h2>
          <button className="close-modal" onClick={() => setShowAddReviewModal(false)}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="modal-user-info">
            <UserAvatar name={userName} size="small" />
            <span className="modal-username">{userName}</span>
          </div>
          <textarea
            className="review-textarea"
            placeholder="Share your thoughts..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
