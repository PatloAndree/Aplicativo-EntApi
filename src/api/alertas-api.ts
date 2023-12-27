import { API } from "./api";
import { getMethod } from "./methods";

export interface AlertaAPIType {
  alert_last_up: string;
  alert_temp: string;
  alert_hum: string;
  alert_tipo: string;
  alert_fecha: string;
  alert_hora: string;
  alert_status: string;
  alert_id: string;
  alert_sensor_id: string;
  alert_sensor_nom: string;
  alert_min_temp: string;
  alert_max_temp: string;
  alert_min_hume: string;
  alert_max_hume: string;
  alert_area: string;
  alert_limit_min_temp: string;
  alert_limit_max_temp: string;
  alert_limit_min_hume: string;
  alert_limit_max_hume: string;
}

export interface AlertasDataType {
  status: boolean;
  mensaje: string;
  totalRegistros: number;
  paginaActual: number;
  totalPaginas: number;
  data: AlertaAPIType[];
}

export const getAlertasAPI = (
  alertasAPI: string,
  codigo_m: string,
  tipo: string,
  pagina: number
) =>
  getMethod<AlertasDataType>(
    `${API}/api/${alertasAPI}?codigo=${codigo_m}&pagina=${pagina}&tipo=${tipo}`
  ).then(({ status, ...restData }) => {
    if (!status) throw Error("API Error");
    return restData;
  });
