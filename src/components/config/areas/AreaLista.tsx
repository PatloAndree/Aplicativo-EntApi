import React from "react";
import { CameraAPIType } from "../../../api/cameras-api";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import AreaRow from "./AreaRow";
import { useState } from "react";

interface Props {
  areaLista: CameraAPIType[];
  onEdit: (a: CameraAPIType) => void;
  editLoading: boolean;
}
export default function AreaLista(props: Props) {
  const [ordenNombreID, setOrdenNombreID] = useState<"asc" | "desc">("asc");
  const [ordenStatus, setOrdenStatus] = useState<"asc" | "desc">("asc");
  const [ordenConexion, setOrdenConexion] = useState<"asc" | "desc">("asc");

  const toggleOrdenNombreID = () => {
    setOrdenNombreID(ordenNombreID === "asc" ? "desc" : "asc");
  };
  const toggleOrdenStatus = () => {
    setOrdenStatus(ordenStatus === "asc" ? "desc" : "asc");
  };
  const toggleOrdenConexion = () => {
    setOrdenConexion(ordenConexion === "asc" ? "desc" : "asc");
  };
  return (
    <ResponsiveContainer>
      <table className="table mx-auto" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3" rowSpan={2}>
              Nombre
              <span onClick={toggleOrdenNombreID}>
                {ordenNombreID === "asc" ? "▼" : "▲"}
              </span>
            </th>
            <th className="px-3" rowSpan={2}>
              Descripción
            </th>
            <th className="px-3" colSpan={2}>
              Temperatura °C
            </th>
            <th className="px-3" colSpan={2}>
              Humedad %
            </th>
            <th className="px-3" rowSpan={2}>
              Status
              <span onClick={toggleOrdenStatus}>
                {ordenStatus === "asc" ? "▼" : "▲"}
              </span>
            </th>
            <th className="px-3" rowSpan={2}>
              Conexión del gateway
              <span onClick={toggleOrdenConexion}>
                {ordenStatus === "asc" ? "▼" : "▲"}
              </span>
            </th>
            <th className="px-3" rowSpan={2}>
              Acción
            </th>
          </tr>
          <tr>
            <th className="px-3">Max</th>
            <th className="px-3">Min</th>
            <th className="px-3">Max</th>
            <th className="px-3">Min</th>
          </tr>
        </thead>
        <tbody className="text-dark text-opacity-75">
          {props.areaLista.map((area) => (
            <AreaRow
              onEdit={props.onEdit}
              area={area}
              key={area.loc_id}
              editLoading={props.editLoading}
            />
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
