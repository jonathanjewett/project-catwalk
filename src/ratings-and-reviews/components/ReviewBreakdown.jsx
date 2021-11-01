import React from 'react';

const ReviewBreakdown = ({breakdown, total}) => (
  <div className="review-breakdown">
    {console.log(breakdown)};
    <div>
      <label className="review-breakdown-label">
        5 star
      </label>
      <progress id="progress-5-star" max={total} value={breakdown['5']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        4 star
      </label>
      <progress id="progress-4-star" max={total} value={breakdown['4']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        3 star
      </label>
      <progress id="progress-3-star" max={total} value={breakdown['3']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        2 star
      </label>
      <progress id="progress-2-star" max={total} value={breakdown['2']}></progress>
    </div>
    <div>
      <label className="review-breakdown-label">
        1 star
      </label>
      <progress id="progress-1-star" max={total} value={breakdown['1']}></progress>
    </div>
  </div>
);

export default ReviewBreakdown;