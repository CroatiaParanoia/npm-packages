import React from 'react';
import { Component } from './../../types/global';
import './style.scss';
export interface ButtonProps {
    disabled?: boolean;
    type?: 'primary' | 'ghost' | 'default';
    onClick?: () => void;
    children?: React.ReactNode;
}
export declare const Button: Component<ButtonProps>;
