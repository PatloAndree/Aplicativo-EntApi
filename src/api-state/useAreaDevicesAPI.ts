import useSWR from "swr";
import { getCameraDevicesAPI } from "../api/cameras-api";

export function useAreaDevices(codigo_m: string) {
  const { data, error, isLoading } = useSWR(
    ["Consultas/area-devices", codigo_m],
    (args) => getCameraDevicesAPI(codigo_m)
  );

  return { areaList: data, error, isLoading };
}
