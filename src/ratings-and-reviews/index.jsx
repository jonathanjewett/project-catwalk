import React, {useState} from 'react';
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

/** @param {Object} reviews*/
const reviewsAverage = (reviews) => {
  let total = 0;
  let count = 0;
  for (let i in reviews) {
    total += i * reviews[i];
    count += reviews[i];
  }
  let average = (total / count).toFixed(1);
  return Number.parseFloat(average);
};

let averageRating = reviewsAverage(reviewMetaData.ratings);

/** @param {string} newSortType*/

const sortReviews = (newSortType) => {

  let sortedList = reviewList;

  if (newSortType === 'Relevance') {

    sortedList.sort(function (review1, review2) {
      if (review1.date > review2.date) {
        return -1;
      } else if (review1.date < review2.date) {
        return 1;
      }
    });

    sortedList.sort(function (review1, review2) {
      if (review1.helpfulness > review2.helpfulness) {
        return -1;
      } else if (review1.helpfulness < review2.helpfulness) {
        return 1;
      }
    });

    return sortedList;

  } else if (newSortType === 'Newest') {
    return sortedList.sort(function (review1, review2) {
      if (review1.date > review2.date) {
        return -1;
      } else if (review1.date < review2.date) {
        return 1;
      }
    });

  } else if (newSortType === 'Most Helpful') {
    return sortedList.sort(function (review1, review2) {
      if (review1.helpfulness > review2.helpfulness) {
        return -1;
      } else if (review1.helpfulness < review2.helpfulness) {
        return 1;
      }
    });
  }
};


const RatingsAndReviews = () => {

  let [sortType, setSortType] = useState('Relevance');


  const sortedReviews = sortReviews(sortType);

  return (
    <div id="ratings-and-reviews">
      <div className="column-1">
        <h2 className="reviews-header">Ratings & Reviews</h2>
        <span className="reviews-rating">{averageRating}</span>
        <div>
          <StarRating rating={averageRating}/>
        </div>
        <span className="reviews-recommend">100% of reviews recommend this product</span>
        <ReviewBreakdown breakdown={reviewMetaData.ratings}/>
        <ProductBreakdown />
      </div>
      <div className="column-2">
        <Sort breakdown={reviewMetaData.ratings} sortReviews={sortReviews} sortType={sortType} setSortType={setSortType}/>
        <ReviewList reviewList={sortReviews(sortType)}/>
      </div>
    </div>
  );
};

export {reviewsTotal};
export default RatingsAndReviews;
