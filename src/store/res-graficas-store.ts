import { StateCreator } from "zustand";
import { getResGraficasAPI } from "../api/res-graficas-api";
import { StoreType } from "./store";
import { timeFormat } from "d3";

export interface LevelDatumType {
  nivel: number;
  fecha: Date;
  volumen : number;
  warning : number;
  signal : number;
}

export interface ResGraficaType {
  reservorioNombre: string;
  trama: LevelDatumType[];
  label: string;
}
export type RangeType = [Date, Date];

export interface ResGraficasStoreType {
  resGraficas: ResGraficaType[];
  getGraficasLoading: boolean;
  getGraficasError: boolean;
  resTimeRange: RangeType | null;
  getResGraficas: (r: RangeType) => void;
}

export const resGraficasStore: StateCreator<
  StoreType,
  [],
  [],
  ResGraficasStoreType
> = (set) => ({
  resGraficas: [],
  getGraficasLoading: false,
  getGraficasError: false,
  resTimeRange: null,
  getResGraficas: (range: RangeType) => {

    const today = new Date();
    const startDate = new Date(today.getFullYear(), 8, 17);
    const desde = `${timeFormat("%Y-%m-%d")(range[0])} 00:00:00`;
    const hasta = `${timeFormat("%Y-%m-%d")(range[1])} 23:59:59`;

    set({ getGraficasLoading: true, getGraficasError: false });
    getResGraficasAPI(desde, hasta)
      .then<ResGraficaType[]>((data) =>
        data.map(({ reservorioNombre, trama }) => ({
          reservorioNombre,
          trama: trama.map((datum) => ({
            ...datum,
            fecha: new Date(datum.fecha),
          })),
          label: ` ${reservorioNombre}`,
        }))
      )
      .then((resGraficas) =>
        set({
          getGraficasLoading: false,
          resGraficas,
          resTimeRange: [new Date(desde), new Date(hasta)],
          // resTimeRange: [startDate, today],
          
        })
      )
      .catch(() => set({ getGraficasLoading: false, getGraficasError: true }));
  },
});
