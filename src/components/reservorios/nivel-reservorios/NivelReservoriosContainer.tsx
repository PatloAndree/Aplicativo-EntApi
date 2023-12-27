import React from "react";
import { useReservoriosAPI } from "../../../api-state/useReservoriosAPI";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import NivelReservorios from "./NivelReservorios";

export default function NivelReservoriosContainer() {
  const { reservorios, error } = useReservoriosAPI();

  if (!reservorios) return <Loading className="my-5" />;
  if (error) return <ErrorMessage message="Error al cargar datos." />;
  return <NivelReservorios reservorios={reservorios}  />;
}
