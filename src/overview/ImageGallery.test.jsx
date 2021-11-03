import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageGallery from './ImageGallery';
import Overview from './';
import { product, rating, styles } from './sampleData';

// deep copy
/** @type {Style} */
const style = JSON.parse(JSON.stringify(styles[0]));
// more photos so thumbnail scroll arrows appear
style.photos = style.photos.concat(style.photos);

const photos = style.photos.map(photo => `url(${photo.url})`);

const checkButton = (button, next, expected) => {
  render(<ImageGallery style={style}/>);
  const actual = [];
  for (let i = 0; i < expected.length; i++) {
    if (i !== 0) {
      fireEvent.click(document.querySelector(next));
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

describe('left arrow', () => {
  it('displays on every photo but the first', () => {
    const expected = Array(style.photos.length).fill(true);
    expected[0] = false;
    checkButton('.prevStyle', '.nextStyle', expected);
  });

  it('reverses through photos', () => {
    checkImages('.prevStyle', '.nextStyle', photos.slice().reverse());
  });
});

describe('right arrow', () => {
  it('displays on every photo but the last', () => {
    const expected = Array(style.photos.length).fill(true);
    expected[expected.length - 1] = false;
    checkButton('.nextStyle', '.nextStyle', expected);
  });

  it('advances through photos', () => {
    checkImages('.nextStyle', '.prevStyle', photos);
  });
});

const urlMatch = /^(url\()?(.*\?)+/;
const urlBase = (url) => url.match(urlMatch)[2];

describe('thumbnails', () => {
  const numThumbnails = 7;

  it('switches to the corresponding image', () => {
    render(<ImageGallery style={style}/>);
    for (const thumbnail of document.querySelectorAll('.thumbnails img')) {
      fireEvent.click(thumbnail);
      expect(urlBase(screen.getByRole('figure').style.backgroundImage))
        .toBe(urlBase(thumbnail.src));
    }
  });

  it('displays an up arrow only when there is cutoff at the beginning', () => {
    const expected = Array(style.photos.length + 1 - numThumbnails).fill(true);
    expected[0] = false;
    checkButton('.thumbnails button:first-child', '.thumbnails button:last-child', expected);
  });

  it('displays a down arrow only when there is cutoff at the end', () => {
    const expected = Array(style.photos.length + 1 - numThumbnails).fill(true);
    expected[expected.length - 1] = false;
    checkButton('.thumbnails button:last-child', '.thumbnails button:last-child', expected);
  });

  it('highlights the selected thumbnail', () => {
    render(<ImageGallery style={style}/>);
    expect(document.querySelector('img').src).toBe(style.photos[0].thumbnail_url);
    fireEvent.click(document.querySelector('.thumbnails button:last-child'));
    expect(document.querySelector('img').src).toBe(style.photos[1].thumbnail_url);
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
