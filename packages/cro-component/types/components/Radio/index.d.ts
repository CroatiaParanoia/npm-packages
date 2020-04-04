import React from 'react';
import './style.scss';
export interface RadioProps {
    disabled?: boolean;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    layout?: 'column' | 'inline';
}
export declare const Radio: React.FC<RadioProps>;
