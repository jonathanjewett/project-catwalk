import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Helpful from './Helpful';

it('displays the helpfulness score', () => {
  render(<Helpful score={2}/>);
  const score = document.body.textContent.split(' ').pop();
  expect(score).toBe('(2)');
});

it('increments the helpfulness score when clicked', () => {
  render(<Helpful score={2}/>);
  fireEvent.click(document.querySelector('a'));
  const score = document.body.textContent.split(' ').pop();
  expect(score).toBe('(3)');
});

it('can only be clicked once', () => {
  render(<Helpful score={2}/>);
  fireEvent.click(document.querySelector('a'));
  expect(document.querySelector('a')).toBeNull();
});

it('sends a request to the server about an answer', () => {
  render(<Helpful type="answer" score={2} id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/qa/answers/10/helpful']]);
});

it('sends a request to the server about a question', () => {
  render(<Helpful type="question" score={2} id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/qa/questions/10/helpful']]);
});

it('sends a request to the server about a review', () => {
  render(<Helpful type="review" score={2} id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/reviews/10/helpful']]);
});
