import React from 'react';

import Header from './header';
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

const announcement = 'Look forward to great deals on Black Friday!';
const discount = {
  id: 40346,
  name: 'Morning Joggers',
  base: '40.00',
  sale: '35.00'
};
const newProduct = {
  id: 6,
  message: 'Introducing the new 2022 iPod Nano'
};

/**
 * @param {Object} props
 * @param {ProductInfo} props.info
 * @param {Question[]} props.questions
 * @param {ProductInfo[]} props.related
 * @param {Review[]} props.reviews
 */
const App = ({ info, questions, related, reviews }) => (
  <div>
    <Tracker
      render={Header}
      announcement={announcement}
      discount={discount}
      newProduct={newProduct}
    />
    <Tracker
      render={Overview}
      info={info}
      reviewCount={reviews.length}
    />
    <Tracker
      render={RelatedItemsAndComparisons}
      products={related}
      info={info}
    />
    <Tracker
      render={QuestionsAndAnswers}
      questions={questions}
      product={info.product}
    />
    <Tracker
      render={RatingsAndReviews}
      product={info.product}
      reviews={reviews}
      metadata={info.metadata}
    />
  </div>
);

export default App;
