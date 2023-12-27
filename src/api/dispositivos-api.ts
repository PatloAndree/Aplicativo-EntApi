import { API } from "./api";
import { postMethod, putMethod } from "./methods";
import { getLocal } from "../services/local-storage";
import {UserAPIType} from '../api/auth-api';
import axios from "axios";


export interface DispositivoAPIType {
  dis_id: number;
  dis_mas: number;
  dis_locacion: string;
  dis_sensor_id: string;
  dis_nom: string;
  dis_maxt: string;
  dis_mint: string;
  dis_maxh: string;
  dis_minh: string;
  dis_status: string;
  dis_last_up: string;
  loc_nom: string;
  temp: number;
  hum: number;
  bat: number;
}

export interface DispositivosDataType {
  status: boolean;
  totalRegistros: number;
  listaDatos: DispositivoAPIType[];
  mensaje: string;
}
export const getDispostivosAPI = (loc_codigo: string) =>
  postMethod<DispositivosDataType>(
    `${API}/api/Consultas/dispositivoslista?codigo=${loc_codigo}&tipo=0`
  )
    .then((r) => {
      console.log(JSON.stringify(r.listaDatos));
      return r;
    })
    .then(({ status, listaDatos }) => {
      if (!status) throw Error("API Error");
      return listaDatos;
    });

export const getAllDevicesAPI = (devicesAPI: string, codigo_m: string) =>
  postMethod<DispositivosDataType>(
    `${API}/api/${devicesAPI}?codigo=${codigo_m}&tipo=1`
  ).then(({ status, totalRegistros, listaDatos }) => {
    if (!status) throw Error("API Error");
    return { totalRegistros, listaDatos };
  });



// export const updateDispositivoAPI = (dis: DispositivoUpdateType) => {
//   const query = Object.keys(dis)
//     .map((key) => `${key}=${dis[key]}`)
//     .join("&");
//     console.log("SOY EL QUERY......");
//     console.log(query);
//   return putMethod<UpdateRes>(
//     `${API}/api/Consultas/actualizardispositivo?${query}`
//   );
// };


// export const updateDispositivoAPI = (dis: DispositivoUpdateType) => {
//   const url = `${API}/api/Consultas/actualizardispositivo`;
//   const user = getLocal<UserAPIType>("user");

//   const queryParams = new URLSearchParams();
//   for (const key in dis) {
//     queryParams.append(key, dis[key]);
//   }

//   const headers = {
//     'Authorization': `Bearer ${user?.accessToken}`,
//     'Content-Type': 'application/x-www-form-urlencoded',
//   };

//   const requestOptions: RequestInit = {
//     method: 'PUT',
//     headers,
//   };

//   return fetch(`${url}?${queryParams.toString()}`, requestOptions)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('La solicitud no pudo ser procesada.');
//       }
//       return response.json() as Promise<UpdateRes>;
//     })
//     .catch((error) => {
//       console.error('Error al actualizar el dispositivo:', error);
//       throw error;
//     });
// };


// export const updateDispositivoAPI = async (dis: DispositivoUpdateType) => {
//   const url = `${API}/api/Consultas/actualizardispositivo`;
//   const user = getLocal<UserAPIType>('user');

//   const formData = new FormData();
//   for (const key in dis) {
//     formData.append(key, dis[key]);
//   }
//   const headers = {
//     Authorization: `Bearer ${user?.accessToken}`,
//     'Content-Type': 'multipart/form-data', // Usamos 'multipart/form-data' en lugar de 'application/x-www-form-urlencoded'
//   };

//   try {
//     const response = await axios.put(url, formData, {
//       headers,
//     });

//     if (!response.data) {
//       throw new Error('La solicitud no pudo ser procesada.');
//     }

//     return response.data as UpdateRes;
//   } catch (error) {
//     console.error('Error al actualizar el dispositivo:', error);
//     throw error;
//   }
// };

export interface DispositivoUpdateType {
  [key: string]: string;
}
interface UpdateRes {
  rpta: number;
  mensaje: string;
}

export const updateDispositivoAPI = async (dis: DispositivoUpdateType) => {
  const url = `https://entel-iot.pe/API_ENTEL/api/Consultas/actualizadispositivo`;
    const user = getLocal<UserAPIType>('user');
    console.log("probando Mi data");
    console.log(JSON.stringify(dis,null, 2));
    console.log(dis,null, 2);

  const headers = {
    Authorization: `Bearer ${user?.accessToken}`,
    'Content-Type': 'application/json', 
  };

  try {
    const response = await axios.post(url, dis, {
      headers,
    });

    if (!response.data) {
      throw new Error('La solicitud fallo.');
    }

    return response.data as UpdateRes;
  } catch (error) {
    console.error('Error al actualizar el dispositivo:', error);
    throw error;
  }
};

