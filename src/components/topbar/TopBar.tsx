import React, { ReactNode } from "react";
//import Logo from "../../assets/logo.png";
import Logo from "../../assets/entel_icon.png";
import BtnIcon from "../common/btn-icon/BtnIcon";

interface Props {
  statusText?: string;
  children?: ReactNode;
}

export default function TopBar(props: Props) {
  return (
    <div className="py-1 text-bg-primary ">
      
      <div
        className="ps-3 pe-2 d-flex align-items-center gap-3 "
        style={{ height: "48px" }}
      >
        <a
          href="#sidebar-off"
          data-bs-toggle="offcanvas"
          role="button"
          className=" h-100"
        >
          <img src={Logo} alt="" style={{ height: "100%" }} />

          {/* <div className="fw-bold fs-4 p-2 text-white">LABOTEC</div> */}
        </a>

        <div
          className="ms-2 fs-6 text-opacity-75 text-white d-none d-lg-block"
          style={{ letterSpacing: "0.01em" }}
        >
          {props.statusText}
        </div>
        <div className="ms-auto"></div><BtnIcon className="bg-primary">
      <i className="bi bi-arrow-clockwise text-white fs-6" style={{ fontSize: "24px" }}></i>
    </BtnIcon>
        {props.children}
      </div>
    </div>
  );
}
