import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListView from './';

it('Only renders more items button if there are more items to render', () => {
  render(
    <ListView start={2} more="More">
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
