import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import moment from 'moment';
import { questions } from './sampleData';
import AnswerTile from './AnswerTile';

const answers = Object.values(questions[0].answers);
const answer = answers[0];

beforeEach(() => render(<AnswerTile answer={answer}/>));

it('displays a larger version of a clicked thumbnail', () => {
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  expect(screen.getByRole('dialog').querySelector('img').src)
    .toBe(thumbnail.src);
});

it('removes the larger version of a thumbnail when clicked', () => {
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  fireEvent.click(screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).toBeNull();
});


it('displays the body of the answer', () => {
  expect(document.body).toHaveTextContent(answer.body);
});

it('displays thumbnails of photos', () => {
  expect(screen.getAllByRole('img').map(img => img.getAttribute('src')))
    .toEqual(answer.photos);
});

it('displays the answerer\'s name', () => {
  expect(document.body).toHaveTextContent(answer.answerer_name);
});

it('does not emphasize the names of non-Sellers', () => {
  const name = screen.queryByText(answer.answerer_name);
  if (name) {
    expect(name.tagName).not.toBe('EM');
  }
});

it('emphasizes the Seller\'s name', () => {
  render(<AnswerTile answer={answers[1]}/>);
  expect(screen.getByText('Seller').tagName).toBe('EM');
});

it('displays the question\'s date', () => {
  expect(document.body)
    .toHaveTextContent(moment(answer.date).format('MMMM Do, YYYY'));
});

it('displays the answer\'s helpfulness score', () => {
  expect(document.body).toHaveTextContent(`(${answer.helpfulness})`);
});

it('displays a button for reporting', () => {
  expect(screen.queryByText('Report')).not.toBeNull();
});
