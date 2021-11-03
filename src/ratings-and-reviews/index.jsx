import React from 'react';
import './ratings-and-reviews.scss';
import StarRating from '../common/star-rating/index.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';


import {reviewList, reviewMetaData} from './sampleData.js';

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

/** @param {Object}  */
const reviewsAverage = (reviews) => {
  let total = 0;
  let count = 0;
  for (let i in reviews) {
    total += i * reviews[i];
    count += reviews[i];
  }
  return parseFloat(total / count).toFixed(1);
};

let averageRating = reviewsAverage(reviewMetaData.ratings);


const RatingsAndReviews = () => (
  <div id="ratings-and-reviews">
    <div className="column-1">
      <h2 className="reviews-header">Ratings & Reviews</h2>
      <span className="reviews-rating">{averageRating}</span>
      <div>
        <StarRating rating={3.5}/>
      </div>
      <span className="reviews-recommend">100% of reviews recommend this product</span>
      <ReviewBreakdown breakdown={reviewMetaData.ratings}/>
      <ProductBreakdown />
    </div>
    <div className="column-2">
      <Sort breakdown={reviewMetaData.ratings}/>
      <ReviewList reviewList={reviewList}/>
    </div>

  </div>
);

export {reviewsTotal};
export default RatingsAndReviews;
