import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useAppStore } from "../../store/store";
import { extraOpciones, opcionesLista } from "./opciones-lista";
//import Logo from "../../assets/logo.png";
import Logo from "../../assets/logo_labotec.png";

import BtnIcon from "../common/btn-icon/BtnIcon";

export default function SidebarOff() {
  const logout = useAppStore((state) => state.logout);
  const user = useAppStore((state) => state.user);
  const linksArray = useMemo(() => {
    if (!user) return [];
    return [
      ...user.opciones.map((opcion) =>
        opcionesLista.find((l) => l.codigo === opcion.codigo)
      ),
      ...extraOpciones,
    ];
  }, [user]);
  return (
    <div
      className="offcanvas offcanvas-start bg-primary"
      tabIndex={-1}
      id="sidebar-off"
    >
      <div className="offcanvas-header">
        <img src={Logo} alt="" height={48} />
        <BtnIcon type="button" data-bs-dismiss="offcanvas">
          <i className="bi bi-x text-white fs-4"></i>
        </BtnIcon>
      </div>
      <div className="offcanvas-body">
        {linksArray.map((link) => {
          if (!link) return null;
          return (
            <div
              className="px-3 py-3"
              key={link.label}
              data-bs-dismiss="offcanvas"
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `link d-flex gap-3 align-items-center ${
                    isActive ? `active` : ``
                  }`
                }
              >
                <div className="fs-4">{link.icon}</div>
                <span>{link.label}</span>
              </NavLink>
            </div>
          );
        })}
        <div className="px-2 py-2 text-white">
          <hr />
        </div>
        <div className="px-3 py-3">
          <div
            className="d-flex gap-3 align-items-center link"
            role="button"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right fs-4"></i>
            <span>Salir</span>
          </div>
        </div>
      </div>
    </div>
  );
}
