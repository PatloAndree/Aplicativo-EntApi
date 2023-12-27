import { API } from "./api";

interface OpcionType {
  codigo: number;
  nombre: string;
  ruta: string;
}
export interface UserAPIType {
  id: number;
  username: string;
  roles: string[];
  opciones: OpcionType[];
  accessToken: string;
  tokenType: string;
}

type LoginAPIType = UserAPIType & {
  message: string;
};

export const loginAPI = (nombreUsuario: string, clave: string) =>
  fetch(`${API}/Auth`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ nombreUsuario, clave }),
  })
    .then<LoginAPIType>((data) => data.json())

    .then(({ message, ...user }) => {
      if (message !== "OK") throw Error("Auth Error");
      return user;
});
