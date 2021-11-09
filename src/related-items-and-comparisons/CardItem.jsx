import React, { useEffect, useState } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import './related-items-and-comparisons.scss';
import { Price, StarRating } from '../common';

const CardItem = (props) => {
  const [modal, toggleModal] = useState(false);
  var image_url = '';
  var defaultPrice = '??';
  var salePrice = null;

  const compare = () => toggleModal(modal => !modal);

  const closeModal = () => {
    toggleModal(false);
  };

  const showModal = modal === false ? null :
    <ComparisonModal close={closeModal} product1={props.product} product2={props.currentProduct.product}/>; // Need to pass in product2 info as a prop later

  for (var i = 0; i < props.styles.length; i++) {
    if (props.styles[i]['default?'] === true) {
      image_url = props.styles[i].photos[0].url; // unused for now, need to clarify what default images should be
      defaultPrice = props.styles[i].original_price;
      salePrice = props.styles[i].sale_price;
    }
  }

  return (
    <div className="card-item">
      {showModal}
      <div className="product-image">
        <img className="card-images" src={props.styles[0].photos[0].url} width="250" height="275"></img>
        <div className="card-action-button" onClick={compare}>☆</div>
      </div>
      <div className="category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="product-name">
        {props.product.name}
      </div>
      <Price base={props.product.default_price} sale={salePrice}/>
      <div className="star-rating">
        <StarRating rating={props.rating} />
      </div>
    </div>
  );
};

export default CardItem;
