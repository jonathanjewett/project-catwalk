import React from 'react';
import { render, screen } from '@testing-library/react';
import Price from './';

it('displays price and sale in the correct format', () => {
  render(<Price base="123.00" sale="124.01"/>);
  expect(screen.queryByText('$123')).not.toBeNull();
  expect(screen.queryByText('$124.01')).not.toBeNull();
});

it('shows the sale price if there is a sale', () => {
  render(<Price base="123.00" sale="124.01"/>);
  expect(document.body.children[0].children[0].childElementCount).toBe(2);
});


it('hides the sale price if there is no sale', () => {
  render(<Price base="123.00"/>);
  expect(document.body.children[0].children[0].childElementCount).toBeLessThan(2);
});
