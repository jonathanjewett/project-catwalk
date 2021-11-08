import React from 'react';
import {Helpful, Report, StarRating} from '../../common';
import '../ratings-and-reviews.scss';
import moment from 'moment';


const ReviewTile = ({review}) => (
  <div className="review-tile">
    <StarRating rating={review.rating}/>
    <div className="details">
      <span className="review-userdata">{review.reviewer_name} | {moment(review.date).format('MMMM, Do YYYY')}</span>
    </div>
    <h3 className="review-header">{review.summary}</h3>
    <p className="review-body">{review.body}</p>
    <footer className="details">
      {review.recommend
        ? <span className="checkmark">I recommend this product</span>
        : null
      }
      <Helpful type="review" score={review.helpfulness} id={review.review_id}/>
      <Report type="review" id={review.review_id}/>
    </footer>
  </div>
);

export default ReviewTile;
