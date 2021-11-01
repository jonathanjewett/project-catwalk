import React from 'react';
import './related-items-and-comparisons.scss';

const CardItem = (props) => {

  return (
    <div className="card-item">
      <div className="product-image">
        <img src="https://wallpapercave.com/wp/wp8540209.jpg" alt="placeholder-image" width="250" height="300"></img>
      </div>
      <div className="category">
        CATEGORY
      </div>
      <div className="product-name">
        Product Name
      </div>
      <div className="price">
        $125
      </div>
      <div className="star-rating">
        * * * * *
      </div>
    </div>
  );
};

export default CardItem;