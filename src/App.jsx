import React from 'react';

import Overview from './overview';
import QuestionsAndAnswers from './questions-and-answers';
import RatingsAndReviews from './ratings-and-reviews';
import RelatedItemsAndComparisons from './related-items-and-comparisons';

const App = () => (
  <div>
    <Overview/>
    <QuestionsAndAnswers/>
    <RatingsAndReviews/>
    <RelatedItemsAndComparisons/>
  </div>
);

export default App;
