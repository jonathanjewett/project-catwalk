import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

it('displays all modules', () => {
  const app = render(<App/>);

  expect(document.querySelector('#overview'))
    .toBeInTheDocument();

  expect(document.querySelector('#questions-and-answers'))
    .toBeInTheDocument();

  expect(document.querySelector('#ratings-and-reviews'))
    .toBeInTheDocument();

  expect(document.querySelector('#related-items-and-comparisons'))
    .toBeInTheDocument();
});
