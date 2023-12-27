import { API2 } from "./api2";
import { getMethod } from "./methods";

export interface balonAPItype {
  id: number;
  nombre_alerta: string;

}

export interface balonDataType {
  data: balonAPItype[];
}

export const getBalonApi = (
 
) =>
  getMethod<balonDataType>(
    `${API2}/alertas/getAlertas`
  ).then(({ ...restData } ) => {
    return restData;
  });
