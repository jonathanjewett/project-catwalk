import React from 'react';
import './ratings-and-reviews.scss';
import StarRating from './components/StarRating.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';


const RatingsAndReviews = () => (
  <div className="ratings-and-reviews">
    <h2 className="r-and-r-header">Ratings & Reviews</h2>

    <span className="r-and-r-rating">3.5</span>
    <StarRating />
    <span>100% of reviews recommend this product</span>
    <ReviewBreakdown />
    <ProductBreakdown />
    <Sort />
    <ReviewList />
  </div>
);

export default RatingsAndReviews;
