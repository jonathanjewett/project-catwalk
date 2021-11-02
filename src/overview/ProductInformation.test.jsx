import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import ProductInformation from './ProductInformation';
import { product, rating, styles } from './sampleData';


it('displays product name, category', () => {
  const style = styles[0];
  render(<ProductInformation product={product} rating={rating} style={style}/>);
  expect(screen.queryByText(product.name)).not.toBeNull();
  expect(screen.queryByText(product.category)).not.toBeNull();
});

it('sends users to the Ratings & Reviews section on click', () => {
  const style = styles[0];
  render(<ProductInformation product={product} rating={rating} style={style}/>);
  const anchor = screen.getByRole('link').getAttribute('href');
  expect(anchor.startsWith('#')).toBe(true);
  const app = render(<App/>);
  expect(app.container.querySelector(anchor)).not.toBeNull();
});

it('displays price and sale in the correct format', () => {
  // deep copy
  const style = JSON.parse(JSON.stringify(styles[0]));
  style['original_price'] = '123.00';
  style['sale_price'] = '124.01';

  render(<ProductInformation product={product} rating={rating} style={style}/>);

  expect(screen.queryByText('$123')).not.toBeNull();
  expect(screen.queryByText('$124.01')).not.toBeNull();
});

it('hides the sale price if there is no sale', () => {
  const style = styles[0];
  const withSale = render(
    <ProductInformation product={product} rating={rating} style={style}/>
  );
  expect(withSale.container.querySelector('.price').childElementCount).toBe(2);

  const styleCopy = JSON.parse(JSON.stringify(style));
  styleCopy['sale_price'] = null;
  const withoutSale = render(
    <ProductInformation product={product} rating={rating} style={styleCopy}/>
  );
  expect(withoutSale.container.querySelector('.price').childElementCount)
    .toBeLessThan(2);
});
