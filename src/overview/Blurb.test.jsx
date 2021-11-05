import React from 'react';
import { render, screen } from '@testing-library/react';
import Blurb from './Blurb';
import { product } from './sampleData';

it('displays the product slogan and description', () => {
  render(<Blurb product={product}/>);
  expect(screen.queryByText(product.slogan)).not.toBeNull();
  expect(screen.queryByText(product.description)).not.toBeNull();
});
