import React, {useState, useEffect} from 'react';
import {reviewsTotal} from '../index.jsx';

// Number of reviews in label based on data from API
// Depending on which option is selected, re sort the tiles in ReviewTile based on corresponding option


const Sort = ({breakdown, setSortType}) => {

  return (
    <div className="review-sort">
      <label> {reviewsTotal(breakdown)} reviews, sorted by </label>
      <select onChange={(e) => setSortType(e.target.value) }className="review-dropdown">
        <option>Relevance</option>
        <option>Newest</option>
        <option>Most Helpful</option>
      </select>
    </div>
  );
};

export default Sort;
