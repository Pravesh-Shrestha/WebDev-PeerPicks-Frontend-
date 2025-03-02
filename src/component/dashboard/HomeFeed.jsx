
import React from 'react';
import ReviewCard from './ReviewCard';

const HomeFeed = ({ reviews }) => {
  return (
    <div className="feed">
      <div className="feed-header">
        <h2>Your Feed</h2>
      </div>
      {/* <div className="feed-filter">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Following</button>
        <button className="filter-btn">Popular</button>
      </div> */}
      {reviews.map(review => <ReviewCard key={review.id} review={review} />)}
    </div>
  );
};

export default HomeFeed;
