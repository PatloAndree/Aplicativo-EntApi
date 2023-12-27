import React from "react";

interface Props {
  message: string;
  className?: string;
}
export default function ErrorMessage(props: Props) {
  return (
    <div>
      <div
        className={`alert alert-danger alert-dismissible ${props.className}`}
      >
        {props.message}
        <button className="btn-close btn-sm" data-bs-dismiss="alert"></button>
      </div>
    </div>
  );
}
