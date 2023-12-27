import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import CardResume from "./CardResume";
import { AiOutlineRightCircle as Right } from "react-icons/ai";

interface PropsType {
  to: string;
  titleCounter: string;
  counter?: number;
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
}
export default function CardResumeDetails({
  to: route,
  children,
  ...restProps
}: PropsType) {
  return (
    <CardResume {...restProps}>
      <div className="d-flex mt-2">
        <Link className="ms-auto btn btn-sm btn-bare-secondary" to={route}>
          Detalles <Right className="fs-5" />
        </Link>
      </div>
      {children}
    </CardResume>
  );
}
