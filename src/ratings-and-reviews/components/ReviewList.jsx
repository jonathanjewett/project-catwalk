import React, {useState} from 'react';
import ReviewTile from './ReviewTile.jsx';



const ReviewList = ({reviewList}) => {

  let [count, setCount] = useState(2);

  return (
    <div className="review-list">
      {reviewList.slice(0, count).map((review) => <ReviewTile review={review} key={review.review_id}/>)}
      { count <= reviewList.length &&
        <button id="more-reviews" onClick={() => setCount(count + 2) }>More Reviews</button>
      }
      <button className="add-a-review">Add A Review +</button>
    </div>
  );
};

export default ReviewList;