import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { product, metadata, styles } from './overview/sampleData';

const info = { product, metadata, styles };


it('displays all modules', () => {
  render(<App info={info} questions={[]} related={[]} reviews={[]}/>);

  expect(document.querySelector('#overview'))
    .toBeInTheDocument();

  expect(document.querySelector('#questions-and-answers'))
    .toBeInTheDocument();

  expect(document.querySelector('#ratings-and-reviews'))
    .toBeInTheDocument();

  expect(document.querySelector('#related-items-and-comparisons'))
    .toBeInTheDocument();
});
