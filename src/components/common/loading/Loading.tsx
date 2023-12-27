import React from "react";

interface Props {
  className?: string;
}

export default function Loading(props: Props) {
  return (
    <div className={`text-center ${props.className || ""}`}>
      <div
        className="spinner-border fs-4 text-primary"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
