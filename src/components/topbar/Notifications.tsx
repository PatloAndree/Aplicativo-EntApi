import React from "react";
import BtnIcon from "../common/btn-icon/BtnIcon";

interface Props {
  notifications: number;
}
export default function Notification(props: Props) {
  return (
    <div className="dropdown d-flex align-items-center">
      <BtnIcon
        className="bg-primary"
        id="alert-dropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="Opciones de cuenta."
      >
        <i className="bi bi-bell-fill text-white"></i>
      </BtnIcon>
      <ul className="dropdown-menu" aria-labelledby="alert-dropdown">
        <li>
          <button className="dropdown-item py-1">Alertas</button>
        </li>
      </ul>
    </div>
  );
}
