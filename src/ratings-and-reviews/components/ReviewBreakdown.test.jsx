import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewBreakdown from './ReviewBreakdown.jsx';
import {starFilters, setStarFilters} from '../index.jsx';
import {reviewsTotal} from '../index.jsx';

it('Renders bars based on number of ratings', () => {
  const reviews = {1: 25, 2: 10, 3: 50, 4: 70, 5: 100};
  let starFilters = [];
  let setStarFiltesr = () => {};
  const app = render(<ReviewBreakdown breakdown={reviews} starFilters={starFilters} setStarFilters={setStarFilters}/>);

  expect(document.querySelector('#progress-5-star')).toHaveAttribute('value', '100');

  expect(document.querySelector('#progress-4-star')).toHaveAttribute('value', '70');

  expect(document.querySelector('#progress-3-star')).toHaveAttribute('value', '50');

  expect(document.querySelector('#progress-2-star')).toHaveAttribute('value', '10');

  expect(document.querySelector('#progress-1-star')).toHaveAttribute('value', '25');
});
