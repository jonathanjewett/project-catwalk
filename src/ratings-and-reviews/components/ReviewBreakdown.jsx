import React, {useState, useEffect} from 'react';

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

const checkStarFilters = (num, setStarFilters) =>
  setStarFilters(starFilters => {
    starFilters = starFilters.slice(); // new copy
    starFilters[num] = !starFilters[num]; // toggle at index
    return starFilters;
  });

const ReviewBreakdown = ({breakdown, starFilters, setStarFilters}) => (
  <div className="review-breakdown">
    {starFilters.map((filtered, numStars) => (
      <div
        className="star-breakdown"
        onClick={() => checkStarFilters(numStars, setStarFilters)}
        key={numStars}
      >
        <label className={'review-breakdown-label' + (filtered ? ' filtered' : '')}>
          {numStars} star
        </label>
        <progress
          id={`progress-${numStars}-star`}
          max={reviewsTotal(breakdown)}
          value={breakdown[numStars] || 0}
        />
      </div>
    )).reverse()}
  </div>
);

export default ReviewBreakdown;
export {reviewsTotal};
