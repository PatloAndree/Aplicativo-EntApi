import useSWR from "swr";
import { getResumenAPI } from "../api/resumen-api";

export function useResumenAPI(codigo_m: string) {
  const { data, error, isLoading } = useSWR(
    ["Consultas/contadores", codigo_m],
    (args) => getResumenAPI(...args)
  );

  return { resumen: data, error, isLoading };
}
