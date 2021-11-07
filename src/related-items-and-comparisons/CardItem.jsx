import React, { useEffect, useState } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import './related-items-and-comparisons.scss';
import { StarRating } from '../common';

const CardItem = (props) => {
  const [modal, toggleModal] = useState(false);
  var image_url = '';
  var defaultPrice = 0;
  var salePrice = null;

  const compare = () => toggleModal(modal => !modal);

  const closeModal = () => {
    toggleModal(false);
  };

  const showModal = modal === false ? null :
    <ComparisonModal close={closeModal} product1={props.product} />; // Need to pass in product2 info as a prop later

  for (var i = 0; i < props.styles.length; i++) {
    if (props.styles[i]['default?'] === true) {
      image_url = props.styles[i].photos[0].url;
      defaultPrice = props.styles[i].original_price;
      salePrice = props.styles[i].sale_price;
    }
  }

  // if sale price is not null
  // display sale price
  // show defaultprice as crossed out
  const price = salePrice === null ? <div className="price">{'$' + defaultPrice}</div> :
    <div className="price-container">
      <div className="sale-price">{'$' + salePrice}</div>
      <div className="default-price">{'$' + defaultPrice}</div>
    </div>;

  return (
    <div className="card-item">
      {showModal}
      <div className="product-image">
        <img src={image_url} width="250" height="275"></img>
        <div className="card-action-button" onClick={compare}>☆</div>
      </div>
      <div className="category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="product-name">
        {props.product.name}
      </div>
      {price}
      <div className="star-rating">
        <StarRating rating={props.rating} />
      </div>
    </div>
  );
};

export default CardItem;