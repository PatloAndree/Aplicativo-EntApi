import useSWR from "swr";
import { getMailsAPI } from "../api/mails-api";
export function useMailsAPI(codigo_m: string) {
  const { data, isLoading, error, mutate } = useSWR(
    ["Consultas/correolista", codigo_m],
    (args) => getMailsAPI(...args)
  );
  return { mailList: data, isLoading, error, mutate };
}
