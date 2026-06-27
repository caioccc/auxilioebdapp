import React from 'react';
import { Card as MantineCard } from '@mantine/core';

// Wrapper customizado para Card, padronizando design system
interface CardProps extends React.ComponentProps<typeof MantineCard> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <MantineCard
      {...props}
      style={{
        borderRadius: '12px', // lg
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // md
        ...props.style,
      }}
      className={`transition-shadow duration-200 ${className || ''}`}
    >
      {children}
    </MantineCard>
  );
};