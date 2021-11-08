import React, {useState, useEffect} from 'react';
import './ratings-and-reviews.scss';
import {ListView, StarRating} from '../common';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';

/** @param {string} newSortType*/

const sortReviews = (newSortType, reviews) => {
  if (newSortType === 'Relevance') {
    return reviews;
  } else if (newSortType === 'Newest') {
    return reviews.slice().sort(function (review1, review2) {
      if (review1.date > review2.date) {
        return -1;
      } else if (review1.date < review2.date) {
        return 1;
      }
    });

  } else if (newSortType === 'Most Helpful') {
    return reviews.slice().sort(function (review1, review2) {
      if (review1.helpfulness > review2.helpfulness) {
        return -1;
      } else if (review1.helpfulness < review2.helpfulness) {
        return 1;
      }
    });
  }
};

const filterReviews = (starFilters, reviews) => {
  if (!starFilters.length) {
    return reviews;
  }

  let filteredList = [];
  for (let i = 0; i < starFilters.length; i++) {
    filteredList = filteredList.concat(reviews.filter(review => review.rating === starFilters[i]));
  }
  return filteredList;
};

const recommendPercentage = (recommended) => {

  let total = recommended.true + recommended.false;

  return ((recommended.true / total) * 100).toFixed(0);
};


const RatingsAndReviews = ({ reviews, metadata }) => {

  let [sortType, setSortType] = useState('Relevance');

  let [starFilters, setStarFilters] = useState([]);

  reviews = sortReviews(sortType, reviews);
  reviews = filterReviews(starFilters, reviews);


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
        <Sort reviews={reviews} breakdown={metadata.ratings} sortReviews={sortReviews} sortType={sortType} setSortType={setSortType}/>
        <ListView
          more="More Reviews"
          add="Add A Review"
          start={2}
          placeholder="SEARCH REVIEWS"
        >
          {reviews.map(review =>
            <ReviewTile review={review} key={review.review_id}/>
          )}
        </ListView>

      </div>
    </div>
  );
};

export default RatingsAndReviews;
