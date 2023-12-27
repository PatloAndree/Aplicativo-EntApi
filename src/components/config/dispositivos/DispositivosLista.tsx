import React from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import DispositivoRow from "./DispositivoRow";
import { useState } from "react";

interface Props {
  dispositivoLista: DispositivoAPIType[];
  onEdit: (d: DispositivoAPIType) => void;
  editLoading: boolean;
}
export default function DispositivosLista(props: Props) {
  const [ordenNombreID, setOrdenNombreID] = useState<"asc" | "desc">("asc");
  const [ordenCapacidad, setOrdenCapacidad] = useState<"asc" | "desc">("asc")
  const [ordenArea, setOrdenArea] = useState<"asc" | "desc">("asc");
  const [ordenStatus, setOrdenStatus] = useState<"asc" | "desc">("asc");
  const [ordenBateria, setOrdenBateria] = useState<"asc" | "desc">("asc");

  const toggleOrdenNombreID = () => {
    setOrdenNombreID(ordenNombreID === "asc" ? "desc" : "asc");
  };
  const toggleOrdenCapacidad = () => {
    setOrdenCapacidad(ordenCapacidad === "asc" ? "desc" : "asc");
  };
  const toggleOrdenArea = () => {
    setOrdenArea(ordenArea === "asc" ? "desc" : "asc");
  };

  const toggleOrdenStatus = () => {
    setOrdenStatus(ordenStatus === "asc" ? "desc" : "asc");
  };

  const toggleOrdenBateria = () => {
    setOrdenBateria(ordenBateria === "asc" ? "desc" : "asc");
  };
  return (
    <ResponsiveContainer>
      <table className="table" style={{ fontSize: "small" }}>
        <thead>
          <tr>
            <th className="px-3" rowSpan={2}>
              Nombre / ID
              <span onClick={toggleOrdenNombreID}>
                {ordenNombreID === "asc" ? "▼" : "▲"}
              </span>
            </th>
            <th className="px-3" rowSpan={2}>
              Capacidad
              <span onClick={toggleOrdenCapacidad}>
                {ordenCapacidad === "asc" ? "▼" : "▲"}
              </span>
            </th>
            <th className="px-3" rowSpan={2}>
              Área
              <span onClick={toggleOrdenArea}>
                {ordenArea === "asc" ? "▼" : "▲"}
              </span>
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
              Batería
              <span onClick={toggleOrdenBateria}>
                {ordenBateria === "asc" ? "▼" : "▲"}
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
        {props.dispositivoLista
            .sort((a, b) =>
              ordenNombreID === "asc"
                ? a.dis_nom.localeCompare(b.dis_nom)
                : b.dis_nom.localeCompare(a.dis_nom)
            )
            .sort((a, b) => {
              if (ordenCapacidad === "asc") {
                return a.dis_locacion.localeCompare(b.dis_locacion);
              } else {
                return b.dis_locacion.localeCompare(a.dis_locacion);
              }
            })
            .sort((a, b) => {
              if (ordenArea === "asc") {
                return a.dis_locacion.localeCompare(b.dis_locacion);
              } else {
                return b.dis_locacion.localeCompare(a.dis_locacion);
              }
            })
          .map((dis) => (
            <DispositivoRow
              key={dis.dis_id}
              dispositivo={dis}
              onEdit={props.onEdit}
              editLoading={props.editLoading}
            />
          ))}
        </tbody>
      </table>
    </ResponsiveContainer>
  );
}
