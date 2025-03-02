
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import UserAvatar from './UserAvatar';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <UserAvatar name={review.author} />
        <div className="review-author-info">
          <div className="review-author-name">{review.author}</div>
          <div className="review-date">{review.date}</div>
        </div>
        <div className="review-rating">
          {Array(Math.floor(review.rating)).fill().map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
          {review.rating % 1 !== 0 && <FontAwesomeIcon icon={faStar} className="half-star" />}
        </div>
      </div>
      <div className="review-content">{review.content}</div>
      {review.images.length > 0 && (
        <div className="review-images">
          {review.images.map((img, index) => <img key={index} src={img} alt={`Review image ${index + 1}`} className="review-image" />)}
        </div>
      )}
      <div className="review-actions">
        <div className="review-action"><FontAwesomeIcon icon={faHeart} /><span>{review.likes}</span></div>
        <div className="review-action"><FontAwesomeIcon icon={faComment} /><span>{review.comments}</span></div>
        <div className="review-action"><FontAwesomeIcon icon={faShare} /><span>Share</span></div>
      </div>
    </div>
  );
};

export default ReviewCard;
