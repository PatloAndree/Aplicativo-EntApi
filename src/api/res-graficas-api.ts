const resGraficasURL = "https://entel-iot.pe/API_ENTEL/api/Consultas/consultarReservoriosListaTransferencia";

console.log(resGraficasURL);

interface LevelDatumAPI {
  fecha: string;
  nivel: number;
  volumen : number;
  warning : number;
  signal : number;
}

interface ResGraficaType {
  reservorioId: string;
  reservorioNombre:string;
  trama: LevelDatumAPI[];
}

interface DataGraficasType {
  status: boolean;
  totalRegistros: number;
  listaDatos: ResGraficaType[];
}


export const getResGraficasAPI = (fecha_inicio: string, fecha_fin: string) => {
  const requestBody = {
    master:8,
    fecha_inicio,
    fecha_fin,
  };

  return fetch(resGraficasURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then<DataGraficasType>((data) => data.json())
    .then(({ status, listaDatos }) => {
      if (!status) throw Error("API error");

      // Convierte las fechas de inicio y fin en objetos Date
      const startDate = new Date(fecha_inicio);
      const endDate = new Date(fecha_fin);
      console.log("soy la fecha que envia");
      console.log(startDate);
      console.log(endDate);


      // Filtra los datos para incluir solo aquellos dentro del rango de fechas
      const datosFiltrados = listaDatos.map((resGrafica) => ({
        ...resGrafica,
        trama: resGrafica.trama.filter((datum) => {
          const fechaDatum = new Date(datum.fecha);
          return fechaDatum >= startDate && fechaDatum <= endDate;
        }),
      }));

      return datosFiltrados;
    });
};


// export const getResGraficasAPI = (desde: string, hasta: string) => {
//   const requestBody = {
//     empresa: 8,
//   };

//   return fetch(resGraficasURL, {
//     method: "POST",
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
//     .then(({ total, locaciones }) => {
//       return { total, locaciones };
//     });
// };




