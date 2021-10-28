import {render, waitFor, screen} from '@testing-library/react';
import React from 'react';
import RatingsAndReviews from './index.jsx';

describe('RatingsAndReviews', () => {
  test('renders RatingsAndReviews component', () => {
    render(<RatingsAndReviews />);
  });
});
