import { API } from "./api";
import { postMethod } from "./methods";

export interface ResumenType {
  areas_total: number;
  dispositivos_total: number;
  alertas_total: number;
}

interface DataContadoresType {
  status: boolean;
  data: ResumenType;
  mensaje: string;
}

export const getResumenAPI = (resumenAPI: string, codigo_m: string) =>
  postMethod<DataContadoresType>(
    `${API}/api/${resumenAPI}?codigo=${codigo_m}`
  ).then(({ status, data }) => {
    if (!status) throw Error("API Error");
    return data;
  });
