import useSWR from "swr";
import { getBalonApi } from "../api/balon-api";
export function useBalonApi() {
  //tipo=1 pendientes , tipo=0 historial
  const { data} = useSWR(
    ["alertas/getAlertas"],
    (args) => getBalonApi()
  );

  return { data: data?.data };
}
