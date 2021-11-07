import React from 'react';
import { StarRating } from '../common';

const OutfitCard = (props) => {
  const removeFromOutfit = () => {
    props.remove(props.product);
  };

  return (
    <div className="card-item">
      <div className="product-image">
        <img src="https://wallpapercave.com/wp/wp8540209.jpg" width="250" height="250"></img>
        <div className="card-action-button" onClick={removeFromOutfit}>X</div>
      </div>
      <div className="category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="product-name">
        {props.product.name}
      </div>
      <div className="price">
        {'$' + props.product.default_price}
      </div>
      <div className="star-rating">
        <StarRating rating={4} />
      </div>
    </div>
  );

};

export default OutfitCard;