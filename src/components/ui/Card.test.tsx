import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'axe-core';
import { Card } from './Card';

expect.extend(toHaveNoViolations);

describe('Card', () => {
  it('renders with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    expect(screen.getByText('Content').parentElement).toHaveClass('custom-card');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Card>Accessible Card</Card>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});