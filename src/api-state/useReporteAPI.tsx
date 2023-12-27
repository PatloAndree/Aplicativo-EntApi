import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { getGraficasAPI } from "../api/graficas-api";
import { RangeT } from "../store/AreaGraficaProvider";
import { Console } from "console";

export interface ReporteRowType {
  fecha: string;
  [key: string]: any;
}

export function useReporteAPI(
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
    (args) => getGraficasAPI(...args)
  );

  const headersReporte = useMemo<ReporteRowType>(() => {
    let headers = { fecha: "Dispositivo " };
    if (!data) return headers;
    data.headers.forEach((h) => {
      headers = { ...headers, [h.dispositivo_id]: h.dispositivo_nombre };
    });
    return headers;
  }, [data]);

  // const dataReporte = useMemo<ReporteRowType[]>(() => {
  //   let dataReporte: ReporteRowType[] = [];
  //   if (!data) return [];
  //   data.data.forEach((d) => {
  //     const metricas = d.reporte_metricas_prom
  //       .replace("Â", "")
  //       .split("C")
  //       .join("C \n");
  //     if (dataReporte[0]?.fecha === d.reporte_fecha) {
  //       dataReporte[0] = {
  //         ...dataReporte[0],
  //         [d.reporte_sensor_id]: metricas,
  //       };
  //       return;
  //     }
  //     dataReporte = [
  //       {
  //         fecha: d.reporte_fecha,
  //         [d.reporte_sensor_id]: metricas,
  //       },
  //       ...dataReporte,
  //     ];
  //   });
  //   return dataReporte.filter(
  //     (d, i) => i % (dataReporte.length > 3000 ? 12 : 6) === 0
  //   );
  // }, [data]);

  const dataReporte = useMemo<ReporteRowType[]>(() => {
    let dataReporte: ReporteRowType[] = [];
    if (!data) return [];
    data.data.forEach((d) => {
      const metricas = d.reporte_metricas_prom
        .replace("Â", "")
        .split("C")
        .join("C \n");
      if (dataReporte[0]?.fecha === d.reporte_fecha) {
        dataReporte[0] = {
          ...dataReporte[0],
          [d.reporte_sensor_id]: metricas,
        };
        return;
      }
      dataReporte = [
        {
          fecha: d.reporte_fecha,
          [d.reporte_sensor_id]: metricas,
        },
        ...dataReporte,
      ];
    });
    return dataReporte;
  }, [data]);

  console.log("soy datos");
  console.log(dataReporte);

  
  
  return { headersReporte, dataReporte, error, isLoading };
  
}
