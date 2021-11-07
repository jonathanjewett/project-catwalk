import React, {useState, useEffect} from 'react';
import {reviews, reviewsTotal} from '../index.jsx';

const checkStarFilters = (num, starFilters, setStarFilters) => {
  if (starFilters.indexOf(num) === -1) {
    setStarFilters(starFilters.concat([num]));
  } else {
    setStarFilters(starFilters.filter(number => number !== num));
  }
};

const ReviewBreakdown = ({breakdown, starFilters, setStarFilters, filterReviews}) => {


  return (
    <div className="review-breakdown">
      {starFilters.indexOf(5) !== -1 && <span>Filtering by 5 stars </span>}
      {starFilters.indexOf(4) !== -1 && <span>Filtering by 4 stars </span>}
      {starFilters.indexOf(3) !== -1 && <span>Filtering by 3 stars </span>}
      {starFilters.indexOf(2) !== -1 && <span>Filtering by 2 stars </span>}
      {starFilters.indexOf(1) !== -1 && <span>Filtering by 1 stars </span>}
      <div className="star-breakdown" onClick={() => { checkStarFilters(5, starFilters, setStarFilters); }}>
        <label className="review-breakdown-label">
        5 star
        </label>
        <progress id="progress-5-star" max={reviewsTotal(breakdown)} value={breakdown['5']}></progress>
      </div>
      <div className="star-breakdown" onClick={() => { checkStarFilters(4, starFilters, setStarFilters); }}>
        <label className="review-breakdown-label">
        4 star
        </label>
        <progress id="progress-4-star" max={reviewsTotal(breakdown)} value={breakdown['4']}></progress>
      </div>
      <div className="star-breakdown" onClick={() => { checkStarFilters(3, starFilters, setStarFilters); }}>
        <label className="review-breakdown-label">
        3 star
        </label>
        <progress id="progress-3-star" max={reviewsTotal(breakdown)} value={breakdown['3']}></progress>
      </div>
      <div className="star-breakdown" onClick={() => { checkStarFilters(2, starFilters, setStarFilters); }}>
        <label className="review-breakdown-label">
        2 star
        </label>
        <progress id="progress-2-star" max={reviewsTotal(breakdown)} value={breakdown['2']}></progress>
      </div>
      <div className="star-breakdown" onClick={() => { checkStarFilters(1, starFilters, setStarFilters); }}>
        <label className="review-breakdown-label">
        1 star
        </label>
        <progress id="progress-1-star" max={reviewsTotal(breakdown)} value={breakdown['1']}></progress>
      </div>
    </div>
  );
};

export default ReviewBreakdown;