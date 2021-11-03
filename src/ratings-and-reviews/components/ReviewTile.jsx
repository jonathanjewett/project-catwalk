import React from 'react';
import StarRating from '../../common/star-rating/index.jsx';
import '../ratings-and-reviews.scss';
import moment from 'moment';


const ReviewTile = ({review}) => (
  <div className="review-tile">
    <div>
      <StarRating rating={review.rating}/>
      <span className="review-userdata">{review.reviewer_name} | {moment(review.date).format('MMMM, Do YYYY')}</span>
    </div>
    <h3 className="review-header">{review.summary}</h3>
    <p className="review-body">{review.body}</p>
    {review.recommend ?
      <span className="checkmark">I recommend this product</span>
      : <span></span>}
    <span className="review-helpful">Helpful? </span>
    <button className="helpful-button">Yes</button>
    <span className ="button-divider"> | </span>
    <button className="helpful-button">No</button>
    <hr></hr>
  </div>
);

export default ReviewTile;