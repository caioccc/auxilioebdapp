import React from 'react';
import { TextInput as MantineTextInput } from '@mantine/core';

// Wrapper customizado para TextInput, padronizando design system
export const TextInput: React.FC<React.ComponentProps<typeof MantineTextInput>> = (props) => {
  return (
    <MantineTextInput
      {...props}
      style={{
        fontFamily: 'Inter, sans-serif',
        borderRadius: '8px', // md
        ...props.style,
      }}
      className={`transition-colors duration-200 ${props.className || ''}`}
    />
  );
};