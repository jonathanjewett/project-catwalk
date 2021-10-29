import React from 'react';
import { StarRating } from '../common';

/**
 * @param {Object} props
 * @param {Product} props.product
 * @param {number} props.rating
 */
const ProductInformation = ({ product, rating }) => (
  <div>
    <p>
      <StarRating rating={rating}/>
      <a href="#ratings-and-review">Read all reviews</a>
    </p>
    <p className="category">{product.category}</p>
    <h2>{product.name}</h2>
    <h4>{product.slogan}</h4>
    <p>{product.description}</p>
  </div>
);

export default ProductInformation;
