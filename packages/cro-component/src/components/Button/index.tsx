import React from 'react';
import { Component } from './../../types/global';
import './style.scss';

export interface ButtonProps {
  disabled?: boolean;
  type?: 'primary' | 'ghost' | 'default';
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button: Component<ButtonProps> = (props) => {
  const { type = 'default', disabled = false, onClick, children } = props;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`button-base ${disabled ? 'disabled' : type}`}
    >
      {children}
    </button>
  );
};
