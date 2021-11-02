import React from 'react';
import './related-items-and-comparisons.scss';
import { StarRating } from '../common';

const CardItem = (props) => {

  return (
    <div className="card-item">
      <div className="product-image">
        <img className="placeholder-image" src="https://wallpapercave.com/wp/wp8540209.jpg" width="250" height="250"></img>
        <div className="star-button">☆</div>
      </div>
      <div className="category">
        SHOES
      </div>
      <div className="product-name">
        Some Sick Jordans From Into The Spider-Verse
      </div>
      <div className="price">
        $125
      </div>
      <div className="star-rating">
        <StarRating rating={4} />
      </div>
    </div>
  );
};

export default CardItem;