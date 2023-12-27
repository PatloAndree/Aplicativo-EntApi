import React, { ReactNode } from "react";
import CardWidget from "../card-widget/CardWidget";

interface PropsType {
  titleCounter: string;
  counter?: number;
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
}
export default function CardResume(props: PropsType) {
  return (
    <CardWidget className={props.className}>
      <div className="p-3 pt-4 mx-3">
        <div className="text-secondary">{props.titleCounter}</div>
        <div className="mt-2 d-flex align-items-center">
          <span className="fs-2">{props.counter}</span>
          <span className="ms-auto fs-1 text-secondary">{props.icon}</span>
        </div>
        {props.children}
      </div>
    </CardWidget>
  );
}
