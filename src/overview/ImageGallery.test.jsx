import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';
import Overview from './';
import { product, rating, styles } from './sampleData';

const style = styles[0];
const photos = style.photos.map(photo => `url(${photo.url})`);

const checkButton = (button, expected) => {
  render(<ImageGallery style={style}/>);
  const actual = [];
  for (let i = 0; i < style.photos.length; i++) {
    if (i !== 0) {
      fireEvent.click(document.querySelector('.nextStyle'));
    }
    actual.push(document.querySelector(button) !== null);
  }
  expect(actual).toEqual(expected);
};

const checkImages = (button, other, expected) => {
  render(<ImageGallery style={style}/>);

  let clicker;
  while ((clicker = document.querySelector(other)) !== null) {
    fireEvent.click(clicker);
  }

  const actual = [screen.getByRole('figure').style.backgroundImage];

  while ((clicker = document.querySelector(button)) !== null) {
    fireEvent.click(clicker);
    actual.push(screen.getByRole('figure').style.backgroundImage);
  }
  expect(actual).toEqual(expected);
};

describe('.nextStyle', () => {
  it('displays on every photo but the last', () => {
    const expected = Array(style.photos.length).fill(true);
    expected[expected.length - 1] = false;
    checkButton('.nextStyle', expected);
  });

  it('advances through photos', () => {
    checkImages('.nextStyle', '.prevStyle', photos);
  });
});


describe('.prevStyle', () => {
  it('displays on every photo but the first', () => {
    const expected = Array(style.photos.length).fill(true);
    expected[0] = false;
    checkButton('.prevStyle', expected);
  });

  it('reverses through photos', () => {
    checkImages('.prevStyle', '.nextStyle', photos.slice().reverse());
  });
});

describe('click to zoom', () => {
  it('expands the gallery', () => {
    render(<Overview product={product} rating={rating} styles={styles}/>);
    const gallery = screen.getByRole('figure');
    fireEvent.click(gallery);
    expect(document.querySelector('.info')).not.toBeVisible();
  });

  it('shrinks the gallery', () => {
    render(<Overview product={product} rating={rating} styles={styles}/>);
    const gallery = screen.getByRole('figure');
    fireEvent.click(gallery);
    fireEvent.click(gallery);
    expect(document.querySelector('.info')).toBeVisible();
  });

  it('does not expand the gallery if a sub-component is clicked', () => {
    render(<Overview product={product} rating={rating} styles={styles}/>);
    const gallery = screen.getByRole('figure');
    const subComponents = [];
    for (const button of gallery.querySelectorAll('button')) {
      fireEvent.click(screen.getByRole('figure').querySelector('button'));
      expect(document.querySelector('.info')).toBeVisible();
    }
  });
});
