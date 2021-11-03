import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const ReviewList = ({reviewList}) => (

  <div className="review-list">
    {reviewList.map((review, i) => <ReviewTile review={review} key={i}/>)}
  </div>
);

export default ReviewList;