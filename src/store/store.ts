import { create } from "zustand";
import { authStore, AuthStoreType } from "./auth-store";
import { camerasStore, CamerasStoreType } from "./cameras-store";
import { mailsStore, MailsStoreType } from "./mails-store";
import { resGraficasStore, ResGraficasStoreType } from "./res-graficas-store";
import { reservoriosStore, ReservoriosStoreType } from "./reservorios-store";
import { resumenStore, ResumenStoreType } from "./resumen-store";

export type StoreType = ReservoriosStoreType &
  ResGraficasStoreType &
  ResumenStoreType &
  CamerasStoreType &
  MailsStoreType &
  AuthStoreType;

export const useAppStore = create<StoreType>((...args) => ({
  ...authStore(...args),
  ...reservoriosStore(...args),
  ...resGraficasStore(...args),
  ...resumenStore(...args),
  ...camerasStore(...args),
  ...mailsStore(...args),
}));
