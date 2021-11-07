import React, {useState} from 'react';
import ReviewTile from './ReviewTile.jsx';



const ReviewList = ({count, reviews, filteredReviews}) => {

  return (
    <div className="review-list">
      {reviews.slice(0, count).map((review) => <ReviewTile review={review} key={review.review_id}/>)}
    </div>
  );
};

export default ReviewList;
