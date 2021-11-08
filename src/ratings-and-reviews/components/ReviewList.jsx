import React, {useState} from 'react';
import ReviewTile from './ReviewTile.jsx';



const ReviewList = ({reviews, filteredReviews, addView, setAddView}) => {

  let [count, setCount] = useState(2);

  return (
    <div className="review-list">
      {reviews.slice(0, count).map((review) => <ReviewTile review={review} key={review.review_id}/>)}
      { count <= reviews.length &&
        <button className="interact" onClick={() => setCount(count + 2) }>More Reviews</button>
      }
      <button className="interact" onClick={() => setAddView(addView = true)}>Add A Review +</button>
    </div>
  );
};

export default ReviewList;
