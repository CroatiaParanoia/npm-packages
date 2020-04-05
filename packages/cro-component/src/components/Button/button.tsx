import React from 'react';
import { Component } from '../../types/global';
import { ButtonProps } from './interface';
import './style';

const Button: Component<ButtonProps> = (props) => {
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

export default Button;
