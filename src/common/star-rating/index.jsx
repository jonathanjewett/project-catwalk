import React from 'react';
import star0 from './star0.svg';
import star1 from './star1.svg';
import star2 from './star2.svg';
import star3 from './star3.svg';
import star4 from './star4.svg';
import './star-rating.scss';

/**
 * An array of star .svg files corresponding to how filled in the star is.
 * - `star0`: 0/4 filled in, i.e. blank
 * - `star1`: 1/4 filled in
 * - `star2`: 2/4 filled in, i.e. half
 * - `star3`; 3/4 filled in
 * - `star4`: 4/4 filled in, i.e. full
 *
 * Note: These files are rendered as React component functions.
 *
 * @type {(() => JSX.Element)[]}
 */
const stars = [star0, star1, star2, star3, star4];

/**
 * Restricts a value to a certain interval unless it is `NaN`.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns `max` if `value` is greater than `max`, `min` if `value` is less
 * than `min`, or `value` otherwise.
 */
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Displays 5 stars, filled up to a specified point.
 *
 * Stars fill in increments of 1/4, so ratings are rounded down to the nearest
 * 1/4th. For example, a rating of 3.45 corresponds to three full stars, one
 * star 25% filled in, and one empty star.
 *
 * @param {number} rating - a decimal between 0 and 5 that determines star fill
 */
const StarRating = ({ rating }) => (
  <span className="stars" role="img">
    {[1, 2, 3, 4, 5].map(i => { // iterate over each of ✩✩✩✩✩
      // depending on the rating, select a filled-in amount from `stars`
      const Star = stars[clamp(1 + rating - i, 0, 1) * 4 | 0];
      return <Star key={i}/>;
    })}
  </span>
);

export default StarRating;
