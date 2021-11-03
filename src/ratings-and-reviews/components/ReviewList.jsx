import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = ({reviewList}) => (

  <div className="review-list">
    {reviewList.map((review) => <ReviewTile review={review} key={review.review_id}/>)}
  </div>
);

export default ReviewList;