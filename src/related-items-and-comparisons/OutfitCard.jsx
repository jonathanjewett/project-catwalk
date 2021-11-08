import React from 'react';
import { Price, StarRating } from '../common';

const OutfitCard = (props) => {
  var image_url = '';
  var defaultPrice = '??';
  var salePrice = null;

  const removeFromOutfit = () => {
    props.remove(props.product);
  };

  for (var i = 0; i < props.styles.length; i++) {
    if (props.styles[i]['default?'] === true) {
      image_url = props.styles[i].photos[0].url; // unused for now, need to clarify what default images should be
      defaultPrice = props.styles[i].original_price;
      salePrice = props.styles[i].sale_price;
    }
  }

  return (
    <div className="card-item">
      <div className="product-image">
        <img src={props.styles[0].photos[0].url} width="250" height="250"></img>
        <div className="card-action-button" onClick={removeFromOutfit}>X</div>
      </div>
      <div className="category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="product-name">
        {props.product.name}
      </div>
      <Price base={defaultPrice} sale={salePrice}/>
      <div className="star-rating">
        <StarRating rating={props.rating} />
      </div>
    </div>
  );

};

export default OutfitCard;
