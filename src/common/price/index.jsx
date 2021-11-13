import React from 'react';
import './price.scss';

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
  return `$${priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
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
  sale === null || sale === undefined ? (
    <p className="price">{price(base)}</p>
  ) : (
    <p className="price">
      <span>{price(base)}</span>
      <span> {price(sale)}</span>
    </p>
  );

export default Price;
