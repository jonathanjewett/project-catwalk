import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Modal from './';

it('hides only when the outside is clicked', () => {
  let hidden = false;
  let x = render(<Modal hide={() => hidden = true}/>);
  fireEvent.click(document.querySelector('.modal'));
  expect(hidden).toBe(false);
  fireEvent.click(document.querySelector('.modalBack'));
  expect(hidden).toBe(true);
});
