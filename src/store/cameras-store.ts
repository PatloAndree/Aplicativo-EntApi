import { StateCreator } from "zustand";
import { CameraDevicesType, getCameraDevicesAPI } from "../api/cameras-api";
import { StoreType } from "./store";

export interface CamerasStoreType {
  cameras: CameraDevicesType[];
  camerasLoading: boolean;
  camerasError: boolean;
  getCameras: (codigo_m: string) => void;
}

export const camerasStore: StateCreator<StoreType, [], [], CamerasStoreType> = (
  set
) => ({
  cameras: [],
  camerasLoading: false,
  camerasError: false,
  getCameras: (codigo_m: string) => {
    set({ camerasLoading: true, camerasError: false });
    getCameraDevicesAPI(codigo_m)
      .then((cameras) => set({ cameras, camerasLoading: false }))
      .catch(() => set({ camerasLoading: false, camerasError: true }));
  },
});
