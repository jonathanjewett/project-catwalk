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

/** @param {string} priceString */
const price = (priceString) => {
  if (priceString.endsWith('.00')) {
    priceString = priceString.slice(0, -3);
  }
  return `$${priceString}`;
};

/**
 * @param {Object} props
 * @param {string} props.base
 * @param {string=} props.sale
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
 * @param {Product} props.product
 * @param {number} props.rating
 * @param {Style} props.style
 */
const ProductInformation = ({ product, rating, style }) => {
  const url = `https://www.project-catwalk.com/${product.id}`;
  return (
    <div>
      <p>
        <StarRating rating={rating}/>
        <a href="#ratings-and-review">Read all reviews</a>
      </p>
      <p className="category">{product.category}</p>
      <h2>{product.name}</h2>
      <h4>{product.slogan}</h4>
      <p>{product.description}</p>
      <Price base={style.original_price} sale={style.sale_price}/>
      Share on:
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <PinterestShareButton url={url}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
    </div>
  );
};
/*


Facebook
Twitter
Pinterest

*/
export default ProductInformation;