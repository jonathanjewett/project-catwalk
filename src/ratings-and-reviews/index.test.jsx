import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingsAndReviews from './index.jsx';
import { reviews, metadata } from './sampleData';

it('displays all modules', () => {
  const app = render(<RatingsAndReviews reviews={reviews} metadata={metadata}/>);

  expect(document.querySelector('.review-sort'))
    .toBeInTheDocument();

  expect(document.querySelector('.listview'))
    .toBeInTheDocument();

  expect(document.querySelector('.review-breakdown'))
    .toBeInTheDocument();

  expect(document.querySelector('.product-breakdown'))
    .toBeInTheDocument();
  expect(document.querySelector
  ('.review-tile'))
    .toBeInTheDocument();
});

