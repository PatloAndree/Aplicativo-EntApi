import useSWR from "swr";
import { getAlertasAPI } from "../api/alertas-api";
export function useAlertasAPI(codigo: string, pagina: number, tipo: string) {
  //tipo=1 pendientes , tipo=0 historial
  const { data, error, isLoading } = useSWR(
    ["Consultas/alertaslista", codigo, tipo, pagina],
    (args) => getAlertasAPI(...args)
  );

  return { paginas: data?.totalPaginas, alertas: data?.data, error, isLoading };
}
