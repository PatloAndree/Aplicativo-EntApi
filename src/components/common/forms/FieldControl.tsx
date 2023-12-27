import React, { CSSProperties } from "react";

const inputStyle: CSSProperties = {
  width: "12rem",
};
const udStyle: CSSProperties = {
  width: "3rem",
};

interface Props {
  label: string;
  ud?: string;
  value: string;
  type?: "text" | "number";
  setValue: (v: string) => any;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  inputClassName?: string;
  udStyle?: CSSProperties;
}
export default function FieldControl(props: Props) {
  return (
    <div className="d-flex align-items-center flex-wrap gap-3">
      <div className="opacity-75" style={props.labelStyle}>
        {props.label}:
      </div>
      <div className="ms-auto d-flex align-items-center">
        <input
          type={props.type || "text"}
          className={`form-control bg-light bg-opacity-10 ${
            props.inputClassName || ""
          }`}
          style={props.inputStyle || inputStyle}
          placeholder={props.label}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        <div className="ps-3 text-secondary" style={props.udStyle || udStyle}>
          {props.ud || ""}
        </div>
      </div>
    </div>
  );
}

export function AreaControl(props: Props) {
  return (
    <div className="d-flex align-items-center flex-wrap gap-3">
      <div className="opacity-75" style={props.labelStyle}>
        {props.label}:
      </div>
      <div className="ms-auto d-flex align-items-center">
        <textarea
          className={`form-control bg-light bg-opacity-10 ${
            props.inputClassName || ""
          }`}
          rows={2}
          style={props.inputStyle || inputStyle}
          placeholder={props.label}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
        <div className="ps-3 text-secondary" style={props.udStyle || udStyle}>
          {props.ud}
        </div>
      </div>
    </div>
  );
}
