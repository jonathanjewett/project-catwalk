import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StyleSelector from './StyleSelector';
import { styles } from './sampleData';

it('renders a checkmark on the appropriate button', () => {
  const current = styles.length / 2 | 0;
  render(<StyleSelector style={styles[current]} styles={styles}/>);
  const buttons = screen.getAllByRole('button');
  for (let i = 0; i < buttons.length; i++) {
    expect(buttons[i].childElementCount).toBe(Number(i === current));
  }
});

it('renders the name of the current style', () => {
  for (const style of styles) {
    render(<StyleSelector style={style} styles={styles}/>);
    const label = screen.getByText(style.name);
    expect(label).toBeInTheDocument();
  }
});

let style = styles[0];

for (let i = 1; i <= 10; i++) {
  it(`renders ${i} buttons in the correct number of rows`, () => {
    const stylesList = [];
    for (let j = 0; j < i; j++) {
      const stylesMember = {};
      Object.assign(stylesMember, style);
      stylesMember['style_id'] = j;
      stylesList.push(stylesMember);
    }
    render(<StyleSelector style={style} styles={stylesList}/>);
    const rows = document.querySelectorAll('.styles');
    for (const [j, row] of rows.entries()) {
      if (j === rows.length - 1) {
        expect(row.childElementCount).toBe(i % 4 || 4);
      } else {
        expect(row.childElementCount).toBe(4);
      }
    }
  });
}
