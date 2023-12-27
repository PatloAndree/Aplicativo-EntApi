import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function ResponsiveContainer(props: Props) {
  return (
    <div
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        maxWidth: "85vw",
        margin: "auto",
      }}
    >
      {props.children}
    </div>
  );
}
