import React from "react";
import "../../icon/iconfont.css";

export interface IconProps {
  type: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
} 

export const Icon: React.FC<IconProps> = ({
  type,
  size = 16,
  color = "#000",
  style,
  className
}) => {
  return (
    <i
      className={`iconfont ${type} ${className}`}
      style={{ ...(style || {}), fontSize: size, color }}
    ></i>
  );
};
