import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageGallery from './ImageGallery';
import Overview from './';
import { product, metadata, styles } from './sampleData';

const info = { product, metadata, styles };

// deep copy
/** @type {Style} */
const style = JSON.parse(JSON.stringify(styles[0]));
// more photos so thumbnail scroll arrows appear
style.photos = style.photos.concat(style.photos);

const photos = style.photos.map(photo => `url(${photo.url})`);

beforeEach(() => render(<ImageGallery style={style} setZoom={() => {}}/>));

const checkButton = (button, next, expected) => {
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
    checkButton('#prev-style', '#next-style', expected);
  });

  it('reverses through photos', () => {
    checkImages('#prev-style', '#next-style', photos.slice().reverse());
  });
});

describe('right arrow', () => {
  it('displays on every photo but the last', () => {
    const expected = Array(style.photos.length).fill(true);
    expected[expected.length - 1] = false;
    checkButton('#next-style', '#next-style', expected);
  });

  it('advances through photos', () => {
    checkImages('#next-style', '#prev-style', photos);
  });
});

const urlMatch = /^(url\()?(.*\?)+/;
const urlBase = (url) => url.match(urlMatch)[2];

describe('thumbnails', () => {
  const numThumbnails = 7;

  it('switches to the corresponding image', () => {
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
    expect(document.querySelector('img').src).toBe(style.photos[0].thumbnail_url);
    fireEvent.click(document.querySelector('.thumbnails button:last-child'));
    expect(document.querySelector('img').src).toBe(style.photos[1].thumbnail_url);
  });
});

describe('click to zoom', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    render(<Overview info={info} setZoom={() => {}}/>);
  });

  it('expands the gallery', () => {
    const gallery = screen.getByRole('figure');
    fireEvent.click(gallery);
    expect(document.querySelector('.info')).not.toBeVisible();
  });

  it('shrinks the gallery', () => {
    const gallery = screen.getByRole('figure');
    fireEvent.click(gallery); // expanded
    fireEvent.click(gallery); // zoomed
    fireEvent.click(gallery); // normal
    expect(document.querySelector('.info')).toBeVisible();
  });

  it('does not expand the gallery if a sub-component is clicked', () => {
    const gallery = screen.getByRole('figure');
    for (const button of gallery.querySelectorAll('button')) {
      fireEvent.click(button);
      expect(document.querySelector('.info')).toBeVisible();
    }
  });
});
