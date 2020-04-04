import React from "react";
import "../../icon/iconfont.css";
export interface IconProps {
    type: string;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare const Icon: React.FC<IconProps>;
