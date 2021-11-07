import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Report from './Report';

it('can only be clicked once', () => {
  render(<Report/>);
  fireEvent.click(document.querySelector('a'));
  expect(document.querySelector('a')).toBeNull();
});

it('sends a request to the server about an answer', () => {
  render(<Report type="answer" id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/qa/answers/10/report']]);
});

it('sends a request to the server about a question', () => {
  render(<Report type="question" id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/qa/questions/10/report']]);
});

it('sends a request to the server about a review', () => {
  render(<Report type="review" id={10}/>);
  process.mockRequestLog = [];
  fireEvent.click(document.querySelector('a'));
  expect(process.mockRequestLog)
    .toEqual([['PUT', '/reviews/10/report']]);
});
