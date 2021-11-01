import React from 'react';
// Number of reviews in label based on data from API
// Depending on which option is selected, re sort the tiles in ReviewTile based on corresponding option

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

const Sort = ({breakdown}) => (
  <div className="review-sort">
    <label>{reviewsTotal(breakdown)} reviews, sorted by </label>
    <select className="review-dropdown">
      <option>Relevance</option>
      <option>Newest</option>
      <option>Most Helpful</option>
    </select>
  </div>
);

export default Sort;