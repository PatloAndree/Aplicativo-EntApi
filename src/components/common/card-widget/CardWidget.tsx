import React, { ReactNode, useState } from "react";
import BtnIcon from "../btn-icon/BtnIcon";
import { GoDash as Dash, GoPlus as Plus, GoSync } from "react-icons/go";
import "./card-widget.scss";

interface Props {
  title?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
}
export default function CardWidget(props: Props) {
  const { title, toolbar, children, className, ...restProps } = props;

  const [minimized, setMinimized] = useState(false);

  return (
    <div
      className={`${className || "bg-gray"}  card border-0 shadow`}
      {...restProps}
    >
      {toolbar && (
        <div className="d-flex align-items-center ps-3 pe-2 py-1 rounded-top bg-primary text-white">
          <span className="" style={{ fontSize: "0.9rem" }}>
            {title}
          </span>
          <span className="ms-auto d-flex gap-2 align-items-center">
            {toolbar}
            <BtnIcon
              onClick={() => setMinimized(!minimized)}
              className="text-white"
            >
              {minimized ? <Plus /> : <Dash />}
              {/* <GoSync /> */}
            </BtnIcon>
          </span>
        </div>
      )}
      {/* <div className={minimized ? 'd-none': 'd-block'}>
        {children}
      </div> */}
      {!minimized && (
        <div className="animate__animated animate__fadeIn">{children}</div>
      )}

    </div>
  );
}
