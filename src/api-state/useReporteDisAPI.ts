import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { reporteDis } from "../api/reporteDis-api";
import { RangeT } from "../store/AreaGraficaProvider";

export interface ReporteRowType {
  fecha: string;
  [key: string]: any;
}

export function useReporteDisAPI(
  codigo_m: string,
  loc_codigo: string,
  range: RangeT
) {
  const [fecha_inicio, fecha_fin] = useMemo(() => {
    if (!range) return ["", ""];
    return [timeFormat("%Y-%m-%d")(range[0]), timeFormat("%Y-%m-%d")(range[1])];
  }, [range]);

  const { data, error, isLoading } = useSWR(
    ["Consultas/listarReporte", codigo_m, loc_codigo, fecha_inicio, fecha_fin],
    (args) => reporteDis(...args)
  );

  const headersReporte2 = useMemo<ReporteRowType>(() => {
    let headers = { fecha: "Dispositivo " };
    if (!data) return headers;
    data.headers.forEach((h) => {
      headers = { ...headers, [h.dispositivo_id]: h.dispositivo_nombre };
    });
    return headers;
  }, [data]);

  const dataReporte2 = useMemo<ReporteRowType[]>(() => {
    let dataReporte2: ReporteRowType[] = [];
    if (!data) return [];
    data.data.forEach((d) => {
      const metricas = d.reporte_metricas_prom
        .replace("Â", "")
        .split("C")
        .join("C \n");
      if (dataReporte2[0]?.fecha === d.reporte_fecha) {
        dataReporte2[0] = {
          ...dataReporte2[0],
          [d.reporte_sensor_id]: metricas,
        };
        return;
      }
      dataReporte2 = [
        {
          fecha: d.reporte_fecha,
          [d.reporte_sensor_id]: metricas,
        },
        ...dataReporte2,
      ];
    });

 
    return dataReporte2;

  }, [data]);


  


  return { headersReporte2, dataReporte2, error, isLoading };
}
