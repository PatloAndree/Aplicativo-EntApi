import { useMemo } from "react";
import useSWR from "swr";
import { getCamerasAPI } from "../api/cameras-api";

export function useAreasAPI(codigo_m: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ["Consultas/locacionlista", codigo_m],
    () => getCamerasAPI(codigo_m)
  );

  const registros = useMemo(() => data?.length || 0, [data]);

  return {
    areaLista: data || [],
    registros: registros,
    error,
    isLoading,
    mutate,
  };
}
