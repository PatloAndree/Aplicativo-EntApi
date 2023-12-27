import axios from "axios";
const reservoriosURL = "https://entel-iot.pe/API_ENTEL/api/Consultas/consultarReservoriosUltimaTransferencia";
export interface ReservorioLevelType {
  volumen: number;
  codigo: number;
  nombre: string;
  bateria: number;
  valorminimo: number;
  valorreferencia: number;
  l: number;
  v: number;
  w: number;
  s: number;
  fecha: string;
  alertaMaxima: number; // Agregar esta propiedad
  alertaMinima: number;
}

interface Locaciones {
  locacion:string,
  dispositivos:ReservorioLevelType[];
}

interface DataReservoriosType {
  total: number;
  locaciones: Locaciones[];
}

export const getReservoriosAPI = () => {
  const requestBody = {
    empresa: 8,
  };

  return fetch(reservoriosURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("API error");
      }
      return response.json();
    })
    .then((data: DataReservoriosType) => {
      
      console.log("soy la data que lelga");

      console.log(data);
      const reservoriosConSignal = data.locaciones.map((locacion) => {
        return {
          ...locacion,
          dispositivos: locacion.dispositivos.map((dispositivo) => ({
            ...dispositivo,
            s: dispositivo.s, // Agrega la propiedad 's' desde la API
          })),
        };
      });

      return reservoriosConSignal;
    });
};

export interface ReservorioUpdateMaxMinType {
  imei: string;
  tipo: number;
  max: string;
  min: string;
  
}

interface UpdateRes {
  status: number;
  mensaje: string;
}



export const updateReservorioMaxMinAPI = async (reservorio: ReservorioUpdateMaxMinType) => {
  const reservoriosURL = `https://entel-iot.pe/API_ENTEL/api/Consultas/actualizarDispositivoMQTT`;
  //const reservoriosURL = `https://entel-iot.pe/API_ENTEL/api/Consultas/consultarReservoriosUltimaTransferencia`;

  
    /* const user = getLocal<UserAPIType>('user'); */
    console.log("probando Mi data");
    console.log(JSON.stringify(reservorio,null, 2));
    console.log(reservorio,null, 2);
    
    const requestBody = {
      imei: reservorio.imei,
      max: reservorio.max,
      min: reservorio.min,
      tipo: 2
    };

    return fetch(reservoriosURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no pudo ser procesada.');
      }
      return response.json() as Promise<UpdateRes>;
    })
    .catch((error) => {
      console.error('Error al actualizar el dispositivo:', error);
      throw error;
    });
};

// export const getReservoriosAPI = () => {
//   const requestBody = {
//     empresa: 8,
//   };

//   return fetch(reservoriosURL, {
//     method: "POST", // Utiliza el método HTTP adecuado
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(requestBody),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("API error");
//       }
//       return response.json();
//     })
//     .then(({ locaciones }) => {
//       return locaciones;
//     });
// };


