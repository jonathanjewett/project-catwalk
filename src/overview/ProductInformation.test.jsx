import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ProductInformation from './ProductInformation';
import { product, metadata, styles } from './sampleData';
const rating = metadata.rating;

const renderComponent = () => render(
  <ProductInformation
    product={product}
    rating={rating}
    style={styles[0]}
    reviewCount={10}
  />
);

it('displays product name and category', () => {
  renderComponent();
  expect(screen.queryByText(product.name)).not.toBeNull();
  expect(screen.queryByText(product.category)).not.toBeNull();
});

it('displays the number of reviews', () => {
  renderComponent();
  expect(screen.queryByText('Read all 10 reviews')).not.toBeNull();
});

it('hides the rating section if there are no reviews', () => {
  render(<ProductInformation
    product={product}
    rating={rating}
    style={styles[0]}
    reviewCount={0}
  />);
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.queryByText('Read all 0 reviews')).toBeNull();
  expect(screen.queryByText('Read all reviews')).toBeNull();
});

it('sends users to the Ratings & Reviews section on click', () => {
  renderComponent();
  const anchor = screen.getByRole('link').getAttribute('href');
  expect(anchor.startsWith('#')).toBe(true);
  const info = { product, metadata, styles };
  const app = render(<App info={info} questions={[]} related={[]} reviews={[]}/>);
  expect(app.container.querySelector(anchor)).not.toBeNull();
});
