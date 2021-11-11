import React from 'react';
import { Price, StarRating } from '../common';

/**
 * @param {Object} props
 * @param {number} props.rating
 * @param {number} props.reviewCount
 */
const Rating = ({ rating, reviewCount }) => reviewCount ? (
  <p>
    <StarRating rating={rating}/>
    <a href="#ratings-and-reviews">
      Read all {reviewCount} reviews
    </a>
  </p>
) : null;

/**
 * @param {Object} props
 * @param {ProductInfo} props.product
 * @param {number} props.rating
 * @param {Style} props.style
 * @param {number} props.reviewCount
 */
const ProductInformation = ({ product, rating, style, reviewCount }) => (
  <div>
    <Rating rating={rating} reviewCount={reviewCount}/>
    <p className="category">{product.category}</p>
    <h1>{product.name}</h1>
    <Price base={style.original_price} sale={style.sale_price}/>
  </div>
);

export default ProductInformation;
