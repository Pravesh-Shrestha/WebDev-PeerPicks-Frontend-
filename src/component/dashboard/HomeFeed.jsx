import React, { useEffect, useState } from 'react';
import { getAllRatings, deleteRating } from '../../API/api';
import ReviewCard from './ReviewCard';

const HomeFeed = ({ token }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllRatings(token);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token]);

  const handleDeleteReview = async (id) => {
    try {
      await deleteRating(id, token);
      setReviews((prev) => prev.filter((review) => review.id !== id));
    } catch (err) {
      alert(`Failed to delete review: ${err.message}`);
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feed">
      <div className="feed-header">
        <h2>Your Feed</h2>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard 
            key={review.id} 
            review={review} 
            onDelete={() => handleDeleteReview(review.id)}
          />
        ))
      ) : (
        <div>No reviews yet.</div>
      )}
    </div>
  );
};
export default HomeFeed;