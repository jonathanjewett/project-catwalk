import React, {useState, useEffect} from 'react';

// Number of reviews in label based on data from API
// Depending on which option is selected, re sort the tiles in ReviewTile based on corresponding option


const Sort = ({reviews, sortType, setSortType}) => {

  return (
    <div className="review-sort">
      <label> {reviews.length} reviews, sorted by </label>
      <select onChange={(e) => setSortType( sortType = e.target.value) }className="review-dropdown">
        <option>Relevance</option>
        <option>Newest</option>
        <option>Most Helpful</option>
      </select>
    </div>
  );
};

export default Sort;
