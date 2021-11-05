import React, {useState} from 'react';
import ReviewTile from './ReviewTile.jsx';



const ReviewList = ({reviews}) => {

  let [count, setCount] = useState(2);

  return (
    <div className="review-list">
      {reviews.slice(0, count).map((review) => <ReviewTile review={review} key={review.review_id}/>)}
      { count <= reviews.length &&
        <button id="more-reviews" onClick={() => setCount(count + 2) }>More Reviews</button>
      }
      <button className="add-a-review">Add A Review +</button>
    </div>
  );
};

export default ReviewList;
