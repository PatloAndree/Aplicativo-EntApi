import useSWR from "swr";
import { getAllDevicesAPI,getDispostivosAPI } from "../api/dispositivos-api";

export function useDispositivosAPI(codigo_m: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ["Consultas/dispositivoslista", codigo_m],
    (args) => getAllDevicesAPI(...args)
  );
  return {
    dispositivoLista: data?.listaDatos,
    registros: data?.totalRegistros,
    error,
    isLoading,
    mutate,
  };
}
