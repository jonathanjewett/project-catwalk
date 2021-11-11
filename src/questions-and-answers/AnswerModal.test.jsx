import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnswerModal from './AnswerModal';
import { product, questions } from './sampleData';
const question = questions[0];

// force Formik to shut up
beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

const setText = (name, value) => {
  userEvent.type(screen.getByRole('textbox', { name }), value);
};

it('sends a message to the server', (done) => {
  process.mockRequestLog = [];
  const expected = {
    body: 'test body',
    email: 'test@email.com',
    name: 'test name',
    photos: []
  };
  const onSubmit = () => {
    try {
      expect(process.mockRequestLog).toEqual([
        ['POST', `/qa/questions/${question.question_id}/answers`, expected]
      ]);
      done();
    } catch (error) {
      done(error);
    }
  };
  render(<AnswerModal product={product} question={question} hide={onSubmit}/>);
  setText('Your Answer*', expected.body);
  setText('What is your nickname*', expected.name);
  setText('Your email*', expected.email);
  fireEvent.submit(screen.getByRole('button'));
});
