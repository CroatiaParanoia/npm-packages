import React from 'react';
import './style.scss';
export interface CheckboxProps {
    disabled?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    layout?: 'column' | 'inline';
}
export declare const Checkbox: React.FC<CheckboxProps>;
