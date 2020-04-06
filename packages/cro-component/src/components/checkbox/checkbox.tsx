import React from 'react';
import { Icon } from '../icon';
import { Component } from '../../types/global';
import { CheckboxProps } from './interface';
import './style';

const Checkbox: Component<CheckboxProps> = ({
  checked,
  disabled,
  onChange,
  children,
  layout = 'inline'
}) => {
  return (
    <label
      className={`rc-checkbox ${disabled ? 'disabled' : ''} ${layout}`}
      onClick={() => disabled || onChange?.(!checked)}
    >
      <Icon
        type={`${checked ? 'icon-check-box' : 'icon-checkboxoutlineblank'}`}
        size={22}
        color={checked ? '#1890ff' : '#d9d9d9'}
        style={{ verticalAlign: 'middle' }}
      />
      <span className="label-text">{children}</span>
    </label>
  );
};

Checkbox.schema = {
  title: 'Checkbox',
  type: 'object',
  properties: {
    input: {
      type: 'object',
      properties: {
        disabled: { type: 'boolean', default: false, title: '是否禁用' },
        checked: { type: 'boolean', default: false, title: '是否选中' }
      }
    }
  }
};

export default Checkbox;
