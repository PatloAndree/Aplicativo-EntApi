import useSWR from "swr";
import { getDispostivosAPI } from "../api/dispositivos-api";

export function useDispAreaAPI(loc_codigo?: string) {
  const { data, isLoading, error } = useSWR(
    ["Consultas/dispositivoslista", loc_codigo, "0"],
    () => getDispostivosAPI(loc_codigo || "")
  );

  return { dispositivos: data, isLoading, error };
}
