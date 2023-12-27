import React, { useMemo } from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import { useAppStore } from "../../store/store";
import { extraOpciones, opcionesLista } from "./opciones-lista";

interface Props {
  sidebarOpen: boolean;
  setSidebarOpen: (a: any) => void;
  onLogout?: () => void;
}
function Sidebar(props: Props) {
  const { sidebarOpen, setSidebarOpen } = props;
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };
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
    <div className={`Container bg-primary ${sidebarOpen && "px-2"}`}>
      <button
        className="Sidebarbutton bg-dark text-white"
        onClick={ModSidebaropen}
      >
        <i
          className={`bi bi-chevron-double-${
            sidebarOpen ? "left" : "right"
          } fs-6`}
        ></i>
      </button>
      {linksArray.map((link) => {
        if (!link) return null;
        return (
          <div className="px-3 py-3" key={link.label}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `link d-flex gap-3 align-items-center ${
                  isActive ? `active` : ``
                }`
              }
            >
              <div className="fs-4">{link.icon}</div>
              {sidebarOpen && <span>{link.label}</span>}
            </NavLink>
          </div>
        );
      })}
      <div className="px-2 py-1 text-white">
        <hr />
      </div>
      <div className="px-3 py-3">
        <div
          className="d-flex gap-3 align-items-center link"
          role={"button"}
          onClick={props.onLogout}
        >
          <i className="bi bi-box-arrow-right fs-4"></i>
          {sidebarOpen && <span>Salir</span>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
