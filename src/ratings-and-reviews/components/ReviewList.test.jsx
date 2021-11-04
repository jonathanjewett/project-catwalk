import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewList from './ReviewList.jsx';
import {reviewList} from '../sampleData.js';

it('Only renders more reviews button if there are more reviews to render', () => {

  const reviews = reviewList;


  const app = render(<ReviewList reviewList={reviews}/>);

  let button = document.querySelector('#more-reviews');

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).toBeTruthy;

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).toBeTruthy;

  fireEvent.click(button);
  expect(document.querySelector('#more-reviews')).toBe(null);
});