import React from 'react';
import { Button as MantineButton } from '@mantine/core';

// Wrapper customizado para Button, padronizando design system
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  className?: string;
  variant?: string;
  color?: string;
  leftSection?: React.ReactNode;
  loading?: boolean;
  'aria-label'?: string;
  component?: any;
  size?: string;
  radius?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ style, className, children, ...others }) => {
  return (
    <MantineButton
      {...others}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500, // medium
        borderRadius: '8px', // md
        ...style,
      }}
      className={`transition-colors duration-200 ${className || ''}`}
    >
      {children}
    </MantineButton>
  );
};