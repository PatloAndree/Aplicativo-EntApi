import { StateCreator } from "zustand";
import {
  addMailAPI,
  deleteMailAPI,
  getMailsAPI,
  MailAPIType,
} from "../api/mails-api";
import { StoreType } from "./store";

export interface MailsStoreType {
  mailList: MailAPIType[];
  getMails: (codigo_m: string) => void;
  mailsLoading: boolean;
  mailsError: boolean;
  deleteMail: (id: string) => void;
  deleteMailLoading: boolean;
  deleteMailError: boolean;
  addMail: (nombre: string, email: string, codigo: string) => any;
  addMailLoading: boolean;
  addMailError: boolean;
  addMailSuccess: boolean;
}

export const mailsStore: StateCreator<StoreType, [], [], MailsStoreType> = (
  set
) => ({
  mailList: [],
  getMails: (codigo_m: string) => {
    set({ mailsLoading: true, mailsError: false });
    getMailsAPI("Consultas/correolista", codigo_m)
      .then((mailList) => set({ mailList, mailsLoading: false }))
      .catch(() => set({ mailsLoading: false, mailsError: true }));
  },
  mailsLoading: false,
  mailsError: false,
  deleteMail: (id: string) => {
    set(({ mailList }) => ({
      deleteMailLoading: true,
      deleteMailError: false,
      mailList: mailList.filter((m) => m.correo_id !== +id),
    }));
    deleteMailAPI(id)
      .then(() => set({ deleteMailLoading: false }))
      .catch(() => set({ deleteMailLoading: false, deleteMailError: true }));
  },
  deleteMailLoading: false,
  deleteMailError: false,
  addMail: (nombre: string, email: string, codigo: string) => {
    set({ addMailLoading: true, addMailError: false, addMailSuccess: false });
    return addMailAPI(nombre, email, codigo)
      .then(() =>
        set({
          addMailLoading: false,
          addMailSuccess: true,
        })
      )
      .catch(() => set({ addMailLoading: false, addMailError: true }));
  },
  addMailLoading: false,
  addMailError: false,
  addMailSuccess: false,
});
