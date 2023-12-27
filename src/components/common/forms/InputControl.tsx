import React, { CSSProperties, ReactNode } from "react";

const inputStyle: CSSProperties = {
  width: "12rem",
};
const udStyle: CSSProperties = {
  width: "3rem",
};

interface Props {
  label: string;
  ud?: string;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  inputClassName?: string;
  udStyle?: CSSProperties;
  render: (inputStyle: CSSProperties) => ReactNode;
}
export function InputControl(props: Props) {
  return (
    <div className="d-flex align-items-center flex-wrap gap-3">
      <div className="opacity-75" style={props.labelStyle}>
        {props.label}:
      </div>
      <div className="ms-auto d-flex align-items-center">
        {props.render(props.inputStyle || inputStyle)}
        <div className="ps-3 text-secondary" style={props.udStyle || udStyle}>
          {props.ud || ""}
        </div>
      </div>
    </div>
  );
}
