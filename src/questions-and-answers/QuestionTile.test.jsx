import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QuestionTile from './QuestionTile';
import { product, questions } from './sampleData';

beforeEach(() =>
  render(<QuestionTile product={product} question={questions[0]}/>));

it('displays a modal', () => {
  fireEvent.click(screen.getByText('Add Answer'));
  expect(screen.queryByRole('dialog')).not.toBeNull();
});

it('removes the modal', () => {
  fireEvent.click(screen.getByText('Add Answer'));
  fireEvent.click(screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).toBeNull();
});

it('shows a button to view more answers if necessary', () => {
  const question = JSON.parse(JSON.stringify(questions[0]));
  const answers = question.answers;
  const keys = Object.keys(answers);
  do {
    document.body.innerHTML = '';
    render(<QuestionTile product={product} question={question}/>);
    expect(screen.queryByText('See More Answers') !== null)
      .toBe(keys.length > 2);
    delete answers[keys.pop()];
  } while (keys.length > 0);
});

it('starts collapsed', () => {
  expect(document.querySelectorAll('section').length).toBeLessThanOrEqual(2);
});

it('shows more answers when expanded', () => {
  fireEvent.click(screen.getByText('See More Answers'));
  expect(document.querySelectorAll('section').length)
    .toBe(Object.keys(questions[0].answers).length);
});

it('shows fewer answers when collapsed', () => {
  fireEvent.click(screen.getByText('See More Answers'));
  fireEvent.click(screen.getByText('Collapse Answers'));
  expect(document.querySelectorAll('section').length).toBeLessThanOrEqual(2);
});

it('sorts answers', () => {
  fireEvent.click(screen.getByText('See More Answers'));
  const actual = Array.from(document.querySelectorAll('section p:first-child'))
    .map(paragraph => paragraph.innerHTML);
  const answers = Object.values(questions[0].answers);
  answers.sort((x, y) => y.helpfulness - x.helpfulness);
  const sellers = answers.filter(x => x.answerer_name === 'Seller');
  const nonSellers = answers.filter(x => x.answerer_name !== 'Seller');
  const expected = sellers.concat(nonSellers).map(answer => answer.body);
  expect(actual).toEqual(expected);
});

it('displays the question\'s helpfulness score', () => {
  document.querySelector('.answers').remove();
  expect(document.body)
    .toHaveTextContent(`(${questions[0].question_helpfulness})`);
});
