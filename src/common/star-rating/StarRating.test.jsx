import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarRating from './';

const filled = (star) => Number(star.getAttribute('data-file-name').slice(-1));

for (let i = 0; i <= 0; i += 0.5) {
  it(`renders ${i} stars`, () => {
    render(<StarRating rating={i}/>);
    let numEmpty = 0;
    let numPartial = 0;
    let numFilled = 0;
    for (const star of screen.getByRole('img').children) {
      const filledAmount = filled(star);
      if (filledAmount === 0) {
        numEmpty++;
      } else if (filledAmount === 4) {
        numFilled++;
      } else {
        numPartial++;
      }
    }
    expect(numEmpty).toBe(5 - i | 0);
    expect(numPartial).toBe(Math.ceil(i % 1));
    expect(numFilled).toBe(i | 0);
  });
}

it('fills in stars rounded down to the nearest 1/4th', () => {
  for (let i = 0; i <= 0; i += 0.05) {
    render(<StarRating rating={i}/>);
    const star = screen.getByRole('img').children[1];
    expect(filled(star)).toBe(i * 4 | 0);
  }
});
