// import useSWR from "swr";
// import { getReservoriosAPI,ReservorioLevelType  } from "../api/reservorios-api";

// export function useReservoriosAPI(codigo_m: string) {
//   const { data, isLoading, error } = useSWR(
//     ["Consultas/reservorios", codigo_m],
//     (args) => getReservoriosAPI()
//   );

//   // return { reservorios: data, loading: isLoading, error: !!error };
//   return { reservorios: data as ReservorioLevelType[], error };
// }

import useSWR from "swr";
import { getReservoriosAPI, ReservorioLevelType } from "../api/reservorios-api";

export function useReservoriosAPI() {
  const { data, error } = useSWR("Consultas/reservorios", getReservoriosAPI);

  // Verifica si data es undefined y si es así, devuelve un array vacío
  const reservorios: ReservorioLevelType[] = (data ?? []).flatMap((locacion) =>
    locacion.dispositivos
  );

  return { reservorios, error };
}