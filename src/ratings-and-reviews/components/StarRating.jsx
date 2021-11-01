import React from 'react';
import star0 from '../../common/star-rating/star0.svg';
import star1 from '../../common/star-rating/star1.svg';
import star2 from '../../common/star-rating/star2.svg';
import star3 from '../../common/star-rating/star3.svg';
import star4 from '../../common/star-rating/star4.svg';
import '../../common/star-rating/star-rating.scss';

const StarRating = () => (
  <div>
    <span className="stars"><img src={star4}></img> </span>
    <span className="stars"><img src={star4}></img> </span>
    <span className="stars"><img src={star4}></img> </span>
    <span className="stars"><img src={star4}></img> </span>
    <span className="stars"><img src={star4}></img> </span>
  </div>
);

export default StarRating;