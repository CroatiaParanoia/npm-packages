import React from 'react';
import { Icon } from '../icon';
import { CheckboxProps } from './interface';
import './style';

const Checkbox: React.FC<CheckboxProps> = ({
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

export default Checkbox;
