import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddToCart from './AddToCart';
import { styles } from './sampleData';

// deep copy
const makeStyle = (forEachSku) => {
  const style = JSON.parse(JSON.stringify(styles[0]));
  if (forEachSku) {
    Object.values(style.skus).forEach(forEachSku);
  }
  return style;
};

const getSizeAndQuantity = () => Array.prototype.sort
  .call(screen.getAllByRole('combobox'), (x, y) => x.disabled - y.disabled);

it('displays "Out of Stock" if out of stock', () => {
  const style = makeStyle(sku => sku.quantity = 0);
  render(<AddToCart style={style}/>);
  expect(screen.queryByText('Out of Stock')).not.toBeNull();
});

it('does not display "Out of Stock" if not out of stock', () => {
  render(<AddToCart style={styles[0]}/>);
  expect(screen.queryByText('Out of Stock')).toBeNull();
});

it('does not display sizes that are out of stock', () => {
  const destock = (sku) => sku.size.length === 2;
  const shouldRender = [];
  const style = makeStyle(sku => {
    if (destock(sku)) {
      sku.quantity = 0;
    } else {
      sku.quantity = 1;
      shouldRender.push(sku.size);
    }
  });
  render(<AddToCart style={style}/>);
  const [sizeMenu] = getSizeAndQuantity();
  const didRender = [...sizeMenu.options]
    .slice(1)
    .map(x => x.innerHTML);
  expect(didRender).toEqual(shouldRender);
});

it('updates the quantity with available stock when a size is chosen', () => {
  const skus = [{}];
  const style = makeStyle((sku, i) => {
    sku.quantity = i + 1;
    skus.push(sku);
  });
  render(<AddToCart style={style}/>);
  const [sizeMenu, quantityMenu] = getSizeAndQuantity();
  expect(quantityMenu).toBeDisabled();
  for (let i = 1; i < sizeMenu.options.length; i++) {
    fireEvent.change(sizeMenu, { target: { selectedIndex: i } });
    expect(quantityMenu).toBeEnabled();
    const max = Math.min(15, skus[i].quantity);
    const opts = [...quantityMenu.options];
    expect(opts.length).toBe(max);
    expect(opts[0].innerHTML).toBe('1');
    expect(opts[opts.length - 1].innerHTML).toBe(max.toString());
  }
});

it('opens the size menu if the user clicks add to cart without a size', () => {
  render(<AddToCart style={styles[0]}/>);
  const [sizeMenu] = getSizeAndQuantity();
  fireEvent.change(sizeMenu, { target: { selectedIndex: 1 } });
  const addToCart = screen.getByRole('button');
  fireEvent.click(addToCart);
  expect(sizeMenu).toBeValid();
  fireEvent.change(sizeMenu, { target: { selectedIndex: 0 } });
  fireEvent.click(addToCart);
  expect(sizeMenu).toBeInvalid();
  fireEvent.change(sizeMenu, { target: { selectedIndex: 1 } });
  expect(sizeMenu).toBeValid();
});

it('adds items to the cart', () => {
  process.mockRequestLog = [];
  const style = styles[0];
  const sizeIndex = 0;
  const quantity = 3;
  const size = Object.keys(style.skus)[sizeIndex];
  render(<AddToCart style={styles[0]}/>);
  const [sizeMenu, quantityMenu] = getSizeAndQuantity();
  fireEvent.change(sizeMenu, { target: { selectedIndex: sizeIndex + 1 } });
  fireEvent.change(quantityMenu, { target: { selectedIndex: quantity - 1 } });
  const addToCart = screen.getByRole('button');
  fireEvent.click(addToCart);
  const expectedReq = ['POST', '/cart', { sku_id: size }];
  expect(process.mockRequestLog).toEqual(Array(quantity).fill(expectedReq));
});
