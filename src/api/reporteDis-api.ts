import { API } from "./api";
import { getMethod } from "./methods";

interface DatumAPIType {
  reporte_fecha: string;
  reporte_sensor_id: string;
  reporte_metricas_prom: string;
}

interface HeaderType {
  dispositivo_id: string;
  dispositivo_nombre: string;
}

export interface GraficasResType {
  status: boolean;
  mensaje: string;
  totalRegistros: number;
  headers: HeaderType[];
  data: DatumAPIType[];
}

export const reporteDis = (
  graficasAPI: string,
  codigo_m: string,
  loc_codigo: string,
  fecha_inicio: string,
  fecha_fin: string
) =>
  getMethod<GraficasResType>(
    `${API}/api/${graficasAPI}?indice=${loc_codigo}&codigo=${codigo_m}&tipo=2&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&hora_inicio=00:00:00&hora_fin=24:00:00&cantidad=1000`
  ).then(({ status, data, headers }) => {
    if (!status) throw Error("API Error");
    return { data, headers };
  });


  