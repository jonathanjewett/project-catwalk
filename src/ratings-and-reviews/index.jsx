import React from 'react';
import './ratings-and-reviews.scss';
import StarRating from '../common/star-rating/index.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';

import {reviews, metadata} from './sampleData.js';

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

const RatingsAndReviews = (/* { reviews, metadata } */) => (
  <div id="ratings-and-reviews">
    <div className="column-1">
      <h2 className="reviews-header">Ratings & Reviews</h2>
      <span className="reviews-rating">{metadata.rating.toFixed(1)}</span>
      <div>
        <StarRating rating={metadata.rating}/>
      </div>
      <span className="reviews-recommend">100% of reviews recommend this product</span>
      <ReviewBreakdown breakdown={metadata.ratings}/>
      <ProductBreakdown />
    </div>
    <div className="column-2">
      <Sort breakdown={metadata.ratings} rating={metadata.rating}/>
      <ReviewList reviews={reviews}/>
    </div>

  </div>
);

export {reviewsTotal};
export default RatingsAndReviews;
