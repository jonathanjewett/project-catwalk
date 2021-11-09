import React, {useState, useEffect} from 'react';
import './ratings-and-reviews.scss';
import {ListView, StarRating} from '../common';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import AddReview from './components/AddReview.jsx';

/** @param {string} newSortType*/

const sortReviews = (newSortType, reviews) => {
  if (newSortType === 'Relevance') {
    return reviews;
  }

  if (newSortType === 'Newest') {
    return reviews.slice().sort(function (review1, review2) { // new copy
      return review2.date - review1.date;
    });
  }

  if (newSortType === 'Most Helpful') {
    return reviews.slice().sort(function (review1, review2) { // new copy
      return review2.helpfulness - review1.helpfulness;
    });
  }
};

const filterReviews = (starFilters, reviews) => {
  return starFilters.some(filter => filter) // are we filtering by anything
    ? reviews.filter(review => starFilters[review.rating]) // filtered
    : reviews; // no need to filter
};

const recommendPercentage = (recommended) => {

  let total = recommended.true + recommended.false;

  return 100 * recommended.true / total | 0;
};


const RatingsAndReviews = ({ product, reviews, metadata }) => {

  let [sortType, setSortType] = useState('Relevance');

  // An array of five booleans, one for each star rating,
  // plus an extra at the start for zero stars.
  let [starFilters, setStarFilters] = useState(Array(1).concat(Array(5).fill(false)));

  reviews = sortReviews(sortType, reviews);
  reviews = filterReviews(starFilters, reviews);

  let [addView, setAddView] = useState(false);


  return (
    <div id="ratings-and-reviews">
      <div className="column-1">
        <h2 className="reviews-header">Ratings & Reviews</h2>
        <span className="reviews-rating">{metadata.rating.toFixed(1)}</span>
        <div>
          <StarRating rating={metadata.rating}/>
        </div>
        <span className="reviews-recommend">{recommendPercentage(metadata.recommended)}% of reviews recommend this product</span>
        <ReviewBreakdown breakdown={metadata.ratings} reviews={reviews} starFilters={starFilters} setStarFilters={setStarFilters}/>
        <ProductBreakdown />
      </div>
      <div className="column-2">
        <Sort reviews={reviews} sortType={sortType} setSortType={setSortType}/>
        <ListView
          more="More Reviews"
          add="Add A Review"
          onAdd={() => setAddView(addView = true)}
          start={2}
          placeholder="SEARCH REVIEWS"
        >
          {reviews.map(review =>
            <ReviewTile review={review} key={review.review_id}/>
          )}
        </ListView>
        {addView && <AddReview hide={() => setAddView(addView = false)} product={product}/>}
      </div>
    </div>
  );
};

export default RatingsAndReviews;
