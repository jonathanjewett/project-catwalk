import React from 'react';
import star0 from './star0.svg';
import star1 from './star1.svg';
import star2 from './star2.svg';
import star3 from './star3_2.svg';
import star4 from './star4.svg';
import './star-rating.scss';

const stars = [star0, star1, star2, star3, star4];

/**
 * Restricts a value to a certain interval unless it is `NaN`.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 */
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * @param {number} rating
 */
const StarRating = ({ rating }) => (
  <span className="stars">
    {[1, 2, 3, 4, 5].map(i =>
      <img key={i} src={stars[clamp(rating - i, 0, 1) * 4 | 0]}/>
    )}
  </span>
);

export default StarRating;
