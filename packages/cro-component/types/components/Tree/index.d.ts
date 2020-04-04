import React from 'react';
import './style.scss';
declare type ShowType = 'checkbox' | 'radio';
export interface Option {
    value: string;
    label: string;
    showType: ShowType;
    children?: Option[];
}
export interface TreeProps {
    options: Option[];
    value?: string[];
    expandAll?: boolean;
    onChange?: (value: OutputItem[]) => void;
}
export declare type OutputItem = Pick<Option, 'label' | 'value'>;
export declare const Tree: React.FC<TreeProps>;
export {};
