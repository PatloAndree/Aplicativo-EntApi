import React, { ButtonHTMLAttributes, ReactNode } from "react";
import "./btn-icon.css";

type Props = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function BtnIcon(props: Props) {
  const { className, children, ...btnProps } = props;
  return (
    <button className={`btn-icon btn-sm  ${className}`} {...btnProps}>
      <div
        className={`icon-container d-flex align-items-center justify-content-center`}
      >
        {children}
      </div>
    </button>
  );
}
