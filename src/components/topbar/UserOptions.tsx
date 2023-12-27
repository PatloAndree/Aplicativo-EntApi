import React from "react";

interface Props {
  userName: string;
  onLogout: () => void;
}
export default function UserOptions(props: Props) {
  return (
    <div className="dropdown d-flex align-items-center">
      <button
        className="btn btn-sm text-white dropdown-toggle"
        id="account-dropdown"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="Opciones de cuenta."
      >
        {props.userName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="account-dropdown">
        <li>
          <button className="dropdown-item py-1" onClick={props.onLogout}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}
