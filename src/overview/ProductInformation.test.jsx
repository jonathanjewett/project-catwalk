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
  expect(document.body).toHaveTextContent(product.name);
  expect(document.body).toHaveTextContent(product.category);
});

it('displays the number of reviews', () => {
  renderComponent();
  expect(document.body).toHaveTextContent('Read all 10 reviews');
});

it('hides the rating section if there are no reviews', () => {
  render(<ProductInformation
    product={product}
    rating={rating}
    style={styles[0]}
    reviewCount={0}
  />);
  expect(screen.queryByRole('img')).toBeNull();
  expect(document.body).not.toHaveTextContent('Read all 0 reviews');
  expect(document.body).not.toHaveTextContent('Read all reviews');
});

it('sends users to the Ratings & Reviews section on click', () => {
  renderComponent();
  const anchor = screen.getByRole('link').getAttribute('href');
  expect(anchor.startsWith('#')).toBe(true);
  const info = { product, metadata, styles };
  const app = render(<App info={info} questions={[]} related={[]} reviews={[]}/>);
  expect(app.container.querySelector(anchor)).not.toBeNull();
});
