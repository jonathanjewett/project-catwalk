import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListView from './';

it('Only renders more items button if there are more items to render', () => {
  render(
    <ListView start={2} more="More" add="Add">
      <br/><br/><br/><br/><br/><br/><br/><br/>
    </ListView>
  );

  let button = screen.queryByText('More');

  fireEvent.click(button);
  expect(screen.queryByText('More')).not.toBeNull();

  fireEvent.click(button);
  expect(screen.queryByText('More')).not.toBeNull();

  fireEvent.click(button);
  expect(screen.queryByText('More')).toBeNull();
});

it('filters by keyword', () => {
  render(<ListView start={3} add="add" more="more">
    <p body="11abc">1</p>
    <p body="11cde">2</p>
    <p body={{recur1: {recur2: 'e11abc'}}}>3</p>
  </ListView>);
  const search = screen.getByRole('textbox');
  fireEvent.change(search, { target: { value: 'ab' } });
  expect(screen.queryByText('1')).not.toBeNull();
  expect(screen.queryByText('2')).not.toBeNull();
  expect(screen.queryByText('3')).not.toBeNull();
  fireEvent.change(search, { target: { value: 'abc' } });
  expect(screen.queryByText('1')).not.toBeNull();
  expect(screen.queryByText('2')).toBeNull();
  expect(screen.queryByText('3')).not.toBeNull();
});
