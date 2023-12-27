import { API } from "./api";
import { postMethod,postMethod2 } from "./methods";

interface DatumAPIType {
  report_fechahora:string;
  report_locacion:string;
  report_dispositivo:string;
  report_longitud:string;
  report_volumen:string;
  report_estado:string;
  report_signal:string;
  [key: string]: string;
}

interface HeaderType {
    locacion_codigo: string;
    locacion_nombre: string;
    dispositivo_imei: string;
}

export interface GraficasResType {
  status: boolean;
  mensaje: string;
  totalRegistros: number;
  headers: HeaderType[];
  data: DatumAPIType[];
}

// export const getResGraficasAPI = (
//   graficasAPI: string,
//   codigo_m: string,
//   loc_codigo: string,
//   fecha_inicio: string,
//   fecha_fin: string
// ) =>
// postMethod2<GraficasResType>(
//     `${API}/api/${graficasAPI}?indice=${codigo_m}&tipo=${loc_codigo}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&cantidad=1000`
//   ).then(({ status, data, headers }) => {
//     if (!status) throw Error("API Error");
//     return { data, headers }; 
//   });

export const getResGraficasAPI = (
  graficasAPI: string,
  codigo_m: string,
  loc_codigo: string,
  fecha_inicio: string,
  fecha_fin: string
) => postMethod<GraficasResType>(
  `${API}/api/${graficasAPI}`,
  {
    indice: codigo_m,
    tipo: loc_codigo,
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    cantidad: "100000",
  }
).then(({ status, data, headers }) => {
  if (!status) throw Error("API Error");
  return { data, headers }; 
});

  