import React from 'react';
import { render, screen } from '@testing-library/react';
import Price from './';

it('displays price and sale in the correct format', () => {
  render(<Price base="123.00" sale="124.01"/>);
  expect(screen.queryByText('$123')).not.toBeNull();
  expect(screen.queryByText('$124.01')).not.toBeNull();
});

it('hides the sale price if there is no sale', () => {
  const withSale = render(<Price base="123.00" sale="124.01"/>);
  expect(withSale.container.children[0].childElementCount).toBe(2);

  const withoutSale = render(<Price base="123.00"/>);
  expect(withoutSale.container.children[0].childElementCount).toBeLessThan(2);
});
