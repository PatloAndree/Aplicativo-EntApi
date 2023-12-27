import { timeFormat } from "d3";
import { useMemo } from "react";
import useSWR from "swr";
import { getGraficasAPI } from "../api/graficas-api";
import { RangeT } from "../store/AreaGraficaProvider";

export interface AreaDatumT {
  fecha: Date;
  temp: number;
  hume: number;
  counter?: number;
}
export interface AreaGraficaType {
  id: string;
  label: string;
  trama: AreaDatumT[];
}

export function useAreaGraficaAPI(
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

  const graficaVis = useMemo<AreaGraficaType[]>(() => {
    if (!data) return [];
    let graficas: AreaGraficaType[] = [
      ...data.headers.map((h) => ({
        id: h.dispositivo_id,
        label: h.dispositivo_nombre,
        trama: [],
      })),
      { id: "prom", label: "Promedio", trama: [] },
    ];

    data.data.forEach((d) => {
      const [temp, rest] = d.reporte_metricas_prom.split(" ");
      const hume = rest.split("C")[1].slice(0, -1);
      const fecha = new Date(d.reporte_fecha);
      graficas = graficas.map((g) => {
        //Add datum to grafica w same id
        if (g.id === d.reporte_sensor_id)
          return {
            ...g,
            trama: [{ fecha, hume: +hume, temp: +temp }, ...g.trama],
          };
        //Promedio
        if (g.id === "prom") {
          if (g.trama[0]?.fecha.toString() === fecha.toString()) {
            const [lastDatum, ...restTrama] = g.trama;
            const count = lastDatum.counter;
            if (!count) return g;
            return {
              ...g,
              trama: [
                {
                  fecha,
                  hume: (lastDatum.hume * count + +hume) / (count + 1),
                  temp: (lastDatum.temp * count + +temp) / (count + 1),
                  counter: count + 1,
                },
                ...restTrama,
              ],
            };
          }
          return {
            ...g,
            trama: [
              { fecha, hume: +hume, temp: +temp, counter: 1 },
              ...g.trama,
            ],
          };
        }
        return g;
      });
    });
    return graficas;
  }, [data]);

  return { graficaVis, error, isLoading };
}
