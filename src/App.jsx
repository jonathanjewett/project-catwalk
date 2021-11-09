import React from 'react';

import Overview from './overview';
import QuestionsAndAnswers from './questions-and-answers';
import RatingsAndReviews from './ratings-and-reviews';
import RelatedItemsAndComparisons from './related-items-and-comparisons';
import api from './api';

const Tracker = ({ render: Render, ...props }) => (
  <div onClick={event => {
    const target = event.currentTarget;
    const selector =
      target.id || Array.from(target.classList).find(cla => cla !== 'interact');
    if (selector && (target.onclick || target.onsubmit)) {
      api.logInteraction(selector, Render.name);
    }
  }}>
    <Render {...props}/>
  </div>
);

/**
 * @param {Object} props
 * @param {ProductInfo} props.info
 * @param {Question[]} props.questions
 * @param {ProductInfo[]} props.related
 * @param {Review[]} props.reviews
 */
const App = ({ info, questions, related, reviews }) => (
  <div>
    <Tracker render={Overview} info={info} reviewCount={reviews.length}/>
    <Tracker render={RelatedItemsAndComparisons} products={related} info={info}/>
    <Tracker render={QuestionsAndAnswers} questions={questions} product={info.product}/>
    <Tracker render={RatingsAndReviews} reviews={reviews} metadata={info.metadata}/>
  </div>
);

export default App;
