import React, { useState } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import './related-items-and-comparisons.scss';
import { Price, StarRating } from '../common';

const CardItem = (props) => {
  const [modal, toggleModal] = useState(false);
  var salePrice = null;

  const compare = (e) => {
    e.preventDefault();
    toggleModal(modal => !modal);
  };
  const closeModal = (e) => {
    e.preventDefault();
    toggleModal(false);
  };

  const showModal = modal === false ? null :
    <ComparisonModal close={closeModal} product1={props.product} product2={props.currentProduct.product} />; // Need to pass in product2 info as a prop later

  for (var i = 0; i < props.styles.length; i++) {
    if (props.styles[i]['default?'] === true) {
      salePrice = props.styles[i].sale_price;
    }
  }

  return (
    <div className="card-item">
      {showModal}
      <a href={'/' + props.product.id}>
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
        <Price base={props.product.default_price} sale={salePrice} />
        <div className="star-rating">
          <StarRating rating={props.rating} />
        </div>
      </a>
    </div>
  );
};

export default CardItem;
