import React from 'react';
import { StarRating } from '../common';

/**
 * @param {Object} props
 * @param {Product} props.product
 */
const ProductInformation = ({ rating }) => (
  <div>
    <p>
      <StarRating rating={rating}/>
      <a href="#ratings-and-review">Read all reviews</a>
    </p>
  </div>
);

export default ProductInformation;
