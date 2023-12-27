import React from "react";

interface Props {
  message: string;
  className?: string;
}
export default function SuccessMessage(props: Props) {
  return (
    <div>
      <div
        className={`alert alert-success alert-dismissible ${props.className}`}
      >
        {props.message}
        <button className="btn-close btn-sm" data-bs-dismiss="alert"></button>
      </div>
    </div>
  );
}
