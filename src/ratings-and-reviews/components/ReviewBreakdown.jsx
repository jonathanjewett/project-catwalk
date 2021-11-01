import React from 'react';

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

const ReviewBreakdown = ({breakdown}) => (
  <div className="review-breakdown">
    <div>
      <label className="review-breakdown-label">
        5 star
      </label>
      <progress id="progress-5-star" max={reviewsTotal(breakdown)} value={breakdown['5']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        4 star
      </label>
      <progress id="progress-4-star" max={reviewsTotal(breakdown)} value={breakdown['4']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        3 star
      </label>
      <progress id="progress-3-star" max={reviewsTotal(breakdown)} value={breakdown['3']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        2 star
      </label>
      <progress id="progress-2-star" max={reviewsTotal(breakdown)} value={breakdown['2']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        1 star
      </label>
      <progress id="progress-1-star" max={reviewsTotal(breakdown)} value={breakdown['1']}></progress>
    </div>
  </div>
);

export default ReviewBreakdown;