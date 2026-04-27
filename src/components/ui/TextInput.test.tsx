import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'axe-core';
import { TextInput } from './TextInput';

expect.extend(toHaveNoViolations);

describe('TextInput', () => {
  it('renders with label', () => {
    render(<TextInput label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('handles value change', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<TextInput className="custom-input" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-input');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TextInput label="Accessible Input" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});