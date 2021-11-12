import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QuestionsAndAnswers from './';
import { product, questions } from './sampleData';

beforeEach(() =>
  render(<QuestionsAndAnswers product={product} questions={questions}/>));

it('displays a modal', () => {
  fireEvent.click(screen.getByText('Add Question'));
  expect(screen.queryByRole('dialog')).not.toBeNull();
});

it('removes the modal', () => {
  fireEvent.click(screen.getByText('Add Question'));
  fireEvent.click(screen.getByRole('dialog'));
  expect(screen.queryByRole('dialog')).toBeNull();
});

it('displays up to four questions', () => {
  expect(screen.getAllByText('Add Answer').length).toBe(4);
});
