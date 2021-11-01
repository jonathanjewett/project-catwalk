import React from 'react';
import './ratings-and-reviews.scss';
import StarRating from '../common/star-rating/index.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';


import {review, reviewMetaData} from './sampleData.js';


const RatingsAndReviews = () => (
  <div id="ratings-and-reviews">
    <h2 className="reviews-header">Ratings & Reviews</h2>

    <span className="reviews-rating">3.5</span>
    <StarRating />
    <span className="reviews-recommend">100% of reviews recommend this product</span>
    <ReviewBreakdown breakdown={reviewMetaData.ratings}/>
    <ProductBreakdown />
    <Sort breakdown={reviewMetaData.ratings}/>
    <ReviewList />
  </div>
);

export default RatingsAndReviews;
