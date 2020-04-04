import React from 'react';
import { Button } from '../index';
import { render, fireEvent } from '@testing-library/react';

describe('Button', () => {
  it('default', () => {
    const onClick = jest.fn();
    const text = '666';
    const { getByText } = render(<Button onClick={onClick}>{text}</Button>);
    const btnEl = getByText(text);
    expect(btnEl).not.toBe(null);

    expect(onClick.mock.calls.length).toBe(0);
    fireEvent.click(btnEl);
    expect(onClick.mock.calls.length).toBe(1);
  });
});
