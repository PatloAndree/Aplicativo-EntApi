import React from "react";

interface Props {
  className?: string;
  signal: number;
}
export default function SignalIndicator(props: Props) {
  if (props.signal <= 2) {
    return <i className={`bi bi-tion-2 ${props.className || "fs-6"}`}></i>;
  }
  if (props.signal === 3) {
    return <i className={`bi bi-reception-3 ${props.className || "fs-6"}`}></i>;
  }
  return <i className={`bi bi-reception-4 ${props.className || "fs-6"}`}></i>;
}
