/// <reference types="react" />
import './style.scss';
export interface RateProps {
    value?: number;
    count?: number;
    allowHalf?: boolean;
    allowClear?: boolean;
    disabled?: boolean;
    onChange?: (value: number) => void;
}
export declare const Rate: (RateProps: RateProps) => JSX.Element;
