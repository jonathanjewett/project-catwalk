import React, { useEffect, useState } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import './related-items-and-comparisons.scss';
import { StarRating } from '../common';

const CardItem = (props) => {
  const [modal, toggleModal] = useState(false);

  const compare = () => toggleModal(modal => !modal);

  const closeModal = () => {
    toggleModal(false);
  };

  const showModal = modal === false ? null :
    <ComparisonModal close={closeModal} product1={props.product}/>; // Need to pass in product2 info as a prop later

  return (
    <div className="card-item">
      {showModal}
      <div className="product-image">
        <img src={props.image} width="250" height="275"></img>
        <div className="card-action-button" onClick={compare}>☆</div>
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
        <StarRating rating={props.rating} />
      </div>
    </div>
  );
};

export default CardItem;