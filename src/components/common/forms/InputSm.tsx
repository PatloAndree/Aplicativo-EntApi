import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

type Props = {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputSm({
  value,
  onChange,
  className,
  type,
  ...restProps
}: Props) {
  return (
    <input
      type={type || "number"}
      className={`form-control form-control-sm text-opacity-75 text-dark ${
        className || "bg-light bg-opacity-10"
      }`}
      style={{ width: "6rem" }}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
}
