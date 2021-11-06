import React from 'react';

import Overview from './overview';
import QuestionsAndAnswers from './questions-and-answers';
import RatingsAndReviews from './ratings-and-reviews';
import RelatedItemsAndComparisons from './related-items-and-comparisons';

/**
 * @param {Object} props
 * @param {ProductInfo} props.info
 * @param {Question[]} props.questions
 * @param {ProductInfo[]} props.related
 * @param {Review[]} props.reviews
 */
const App = ({ info, questions, related, reviews }) => {
  return (
    <div>
      <Overview info={info} reviewCount={reviews.length}/>
      <RelatedItemsAndComparisons products={related}/>
      <QuestionsAndAnswers questions={questions}/>
      <RatingsAndReviews reviews={reviews} metadata={info.metadata}/>
    </div>
  );
};

export default App;
