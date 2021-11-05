import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewList from './ReviewList.jsx';
import {reviews} from '../sampleData.js';

it('Only renders more reviews button if there are more reviews to render', () => {
  reviews.length = 6;
  const app = render(<ReviewList reviews={reviews}/>);

  let button = document.querySelector('#more-reviews');

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).not.toBeNull();

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).not.toBeNull();

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).toBeNull();
});
