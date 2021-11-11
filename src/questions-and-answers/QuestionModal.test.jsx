import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionModal from './QuestionModal';
import { product } from './sampleData';

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
    product_id: product.id
  };
  const onSubmit = () => {
    try {
      expect(process.mockRequestLog).toEqual([
        ['POST', '/qa/questions', expected]
      ]);
      done();
    } catch (error) {
      done(error);
    }
  };
  render(<QuestionModal product={product} hide={onSubmit}/>);
  setText('Your Question*', expected.body);
  setText('What is your nickname*', expected.name);
  setText('Your email*', expected.email);
  fireEvent.submit(screen.getByRole('button'));
});
