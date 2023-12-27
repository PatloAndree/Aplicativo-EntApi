import { API } from "./api";
import { deleteMethod, getMethod, postMethod } from "./methods";

export interface MailAPIType {
  correo_id: number;
  correo_master: string;
  correo_nombre: string;
  correo_email: string;
  correo_numero: null;
  correo_opt: number;
}

interface MailsDataType {
  status: boolean | number;
  totalRegistros: number;
  listaDatos: MailAPIType[];
  mensaje: string;
  error?: string;
}

export const getMailsAPI = (mailsAPI: string, codigo_m: string) =>
  getMethod<MailsDataType>(`${API}/api/${mailsAPI}?codigo=${codigo_m}`).then(
    ({ status, listaDatos, error }) => {
      if (!status || error) throw Error("API Error");
      return listaDatos;
    }
  );

interface DeleteResType {
  rpta: number;
  mensaje: string;
}
export const deleteMailAPI = async (id: string) => {
  const response = await deleteMethod<DeleteResType>(
    `${API}/api/Consultas/eliminarcorreo?codigo=${id}`
  );
  if (response.rpta !== 1) throw Error("No se pudo eliminar.");
  return response;
};

interface AddResType {
  rpta: number;
  mensaje: string;
}
export const addMailAPI = async (
  nombre: string,
  email: string,
  codigo_m: string
) => {
  const response = await postMethod<AddResType>(
    `${API}/api/Consultas/agregarcorreo?codigo=${codigo_m}&nombre=${nombre}&email=${email}`
  );
  if (response.rpta !== 1) throw Error("No se pudo añadir.");
  return response;
};
