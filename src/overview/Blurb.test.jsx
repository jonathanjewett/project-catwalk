import React from 'react';
import { render } from '@testing-library/react';
import Blurb from './Blurb';
import { product } from './sampleData';

it('displays the product slogan and description', () => {
  render(<Blurb product={product}/>);
  expect(document.body).toHaveTextContent(product.slogan);
  expect(document.body).toHaveTextContent(product.description);
});
