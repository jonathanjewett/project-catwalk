import React from 'react';
import StarRating from '../../common/star-rating/index.jsx';
import '../ratings-and-reviews.scss';


const ReviewTile = () => (
  <div className="review-tile">
    <div>
      <StarRating />
      <span className="checkmark">Recommended checkmark</span>
      <span className="review-text">username</span>
      <span className="review-text">date</span>
    </div>
    <h3 className="review-header">review summary</h3>
    <p className="review-body">review body</p>
    <span className="review-text">Helpful?</span>
    <button className="helpful-button">Yes</button>
    <span className ="button-divider"></span>
    <button className="helpful-button">No</button>
  </div>
);

export default ReviewTile;