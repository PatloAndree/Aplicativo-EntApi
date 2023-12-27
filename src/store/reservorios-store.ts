import { StateCreator } from "zustand";
import { getReservoriosAPI, ReservorioLevelType } from "../api/reservorios-api";
import { StoreType } from "./store";

export interface ReservoriosStoreType {
  reservorios: ReservorioLevelType[];
  getResLoading: boolean;
  getResError: boolean;
  getReservorios: () => void;
}

export const reservoriosStore: StateCreator<
  StoreType,
  [],
  [],
  ReservoriosStoreType
> = (set) => ({
  reservorios: [],
  getResLoading: false,
  getResError: false,
  getReservorios: () => {
    set({ getResLoading: true, getResError: false });
    getReservoriosAPI()
      .then((reservorios) => {
        set({ getResLoading: false });
      })
      .catch(() => set({ getResError: true, getResLoading: false }));
  },
});
