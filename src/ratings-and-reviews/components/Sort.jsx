import React, {useState, useEffect} from 'react';

// Number of reviews in label based on data from API
// Depending on which option is selected, re sort the tiles in ReviewTile based on corresponding option


const Sort = ({reviews, sortType, setSortType}) => (
  <div className="review-sort">
    <label> {reviews.length} reviews, sorted by </label>
    <select
      className="review-dropdown"
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
    >
      <option>Relevance</option>
      <option>Newest</option>
      <option>Most Helpful</option>
    </select>
  </div>
);

export default Sort;
