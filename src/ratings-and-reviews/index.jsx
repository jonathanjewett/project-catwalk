import React from 'react';
import './ratings-and-reviews.scss';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';

// this is a test comment

const RatingsAndReviews = () => (
  <div id="ratings-and-reviews">
    <Sort />
    <ReviewList />
    <ReviewBreakdown />
    <ProductBreakdown />
  </div>
);

export default RatingsAndReviews;
