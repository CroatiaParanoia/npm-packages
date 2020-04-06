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

Button.schema = {
  title: 'Button',
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        disabled: { type: 'boolean', default: false, title: '是否禁用' },
        type: { enum: ['default', 'primary', 'ghost'], default: 'default', title: '按钮样式' }
      }
    }
  }
};

export default Button;
