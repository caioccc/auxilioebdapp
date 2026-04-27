import React from 'react';
import { Button as MantineButton } from '@mantine/core';

// Wrapper customizado para Button, padronizando design system
interface ButtonProps extends React.ComponentProps<typeof MantineButton> {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <MantineButton
      {...props}
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500, // medium
        borderRadius: '8px', // md
        ...props.style,
      }}
      className={`transition-colors duration-200 ${props.className || ''}`}
    >
      {props.children}
    </MantineButton>
  );
};