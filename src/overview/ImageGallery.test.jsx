import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';
import { styles } from './sampleData';

const style = styles[0];

it('displays the first image in the style\'s photos', () => {
  render(<ImageGallery style={style}/>);
  expect(screen.getByRole('img').src).toBe(style.photos[0].url);
});
