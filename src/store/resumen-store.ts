import { StateCreator } from "zustand";
import { getResumenAPI, ResumenType } from "../api/resumen-api";
import { StoreType } from "./store";

export interface ResumenStoreType {
  resumen: ResumenType | null;
  resumenLoading: boolean;
  resumenError: boolean;
  getResumen: (codigo_m: string) => void;
}

export const resumenStore: StateCreator<StoreType, [], [], ResumenStoreType> = (
  set
) => ({
  resumen: null,
  resumenLoading: false,
  resumenError: false,
  getResumen: (codigo_m: string) => {
    set({ resumenLoading: true, resumenError: false });
    getResumenAPI("Consultas/contadores", codigo_m)
      .then((resumen) => {
        set({ resumen, resumenLoading: false });
      })
      .catch(() => set({ resumenLoading: false, resumenError: true }));
  },
});
