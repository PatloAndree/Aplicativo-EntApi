import { API } from "./api";
import { getMethod } from "./methods";

export interface AlertaAPITypeRes {
    alerta_locacion:string;
    alerta_dispositiv:string;
  alerta_longitud:string;
  alerta_volumen:string;
  alerta_estado:string;
  alerta_signal:string;
  alerta_fechahora:string;
  alerta_motivo:string;
}

export interface AlertasDataTypeRes {
  status: boolean;
  mensaje: string;
  totalRegistros: number;
  paginaActual: number;
  totalPaginas: number;
  data: AlertaAPITypeRes[];
}

export const getAlertasResAPI = (
  alertasAPI: string,
//   master: string,
//   tipo: string,
//   pagina: number
) =>
  getMethod<AlertasDataTypeRes>(
    // `${API}/api/${alertasAPI}?master=${codigo_m}&tipo=${tipo}`
    `${API}/api/Consultas/listaAlertasReservoriosGas?master=${8}&tipo=${'reservorio'}`
  ).then(({ status, ...restData }) => {
    if (!status) throw Error("API Error");
    return restData;
  });
