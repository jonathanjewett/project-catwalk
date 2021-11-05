import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,

} from 'react-share';
import { StarRating } from '../common';
/**
 * Formats a string as a price, prepending a dollar sign and removing the cents
 * value if the price is a whole number of dollars.
 *
 * @param {string} priceString
 */
const price = (priceString) => {
  if (priceString.endsWith('.00')) {
    priceString = priceString.slice(0, -3);
  }
  return `$${priceString}`;
};

/**
 * Displays the price of a product. If the product is on sale, displays the
 * sale price next to the base price.
 *
 * @param {Object} props
 * @param {string} props.base - base price
 * @param {string=} props.sale - optional sale price
 */
const Price = ({ base, sale }) =>
  sale === null ? (
    <p className="price">{price(base)}</p>
  ) : (
    <p className="price">
      <span>{price(base)}</span>
      <span> {price(sale)}</span>
    </p>
  );

/**
 * @param {Object} props
 * @param {ProductInfo} props.product
 * @param {number} props.rating
 * @param {Style} props.style
 */
const ProductInformation = ({ product, rating, style }) => (
  <div>
    <p>
      <StarRating rating={rating}/>
      <a href="#ratings-and-reviews">Read all reviews</a>
    </p>
    <p className="category">{product.category}</p>
    <h1>{product.name}</h1>
    <Price base={style.original_price} sale={style.sale_price}/>
  </div>
);

export default ProductInformation;
