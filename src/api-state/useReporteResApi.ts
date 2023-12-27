import { timeFormat } from "d3";
import { useMemo, useEffect } from "react";
import useSWR from "swr";
import { getGraficasAPI } from "../api/graficas-api";
import { getResGraficasAPI } from "../api/res-reportes-api";
import { RangeT, useAreaGraficaContext } from "../store/AreaGraficaProvider";
import { Console } from "console";

export interface ReporteResRowType {
  fecha: string;
  [key: string]: any;
}

export function useReporteResApi(
  codigo_m: string,
  loc_codigo: string,
  range: RangeT
) {
  const { timeRange, currentArea } = useAreaGraficaContext();
  console.log(currentArea?.id);

  const [fecha_inicio, fecha_fin] = useMemo(() => {
    if (!range) return ["", ""];
    return [timeFormat("%Y-%m-%d")(range[0]), timeFormat("%Y-%m-%d")(range[1])];
  }, [range]);

  const { data, error, isLoading } = useSWR(
    ["Consultas/listarReporteReservoriosGas", codigo_m, loc_codigo, fecha_inicio, fecha_fin],
    (args) => getResGraficasAPI(...args)
  );

  const headersReporte = useMemo<ReporteResRowType>(() => {
    let headers = {
      fecha: "Fecha",
      locacion: "Locación",
      longitud: "Longitud",
      volumen: "Volumen",
      señal: "Señal",
      estado: "Estado"
    };
    if (!data) return headers;
    data.headers.forEach((h) => {
      headers = { ...headers };
    });
    console.log("soy las cabeceras");

    console.log(headers);
    return headers;
  }, [data]);

  const dataReporte = useMemo<ReporteResRowType[]>(() => {
    let dataReporte: ReporteResRowType[] = [];
    if (!data) return [];

    data.data.forEach((d) => {
      if (d.report_dispositivo === currentArea?.id) {
        dataReporte = [
          {
            fecha: d.report_fechahora,
            locacion: d.report_locacion,
            longitud: d.report_longitud,
            volumen: d.report_volumen,
            señal: d.report_signal,
            estado: d.report_estado,
          },
          ...dataReporte,
        ];
      }
    });

    return dataReporte;
  }, [data, currentArea?.id]);

  return { headersReporte, dataReporte, error, isLoading };
}


// export function useReporteResApi(
//   codigo_m: string,
//   loc_codigo: string,
//   range: RangeT
// ) 

// {
//   const { timeRange, currentArea } = useAreaGraficaContext();
//   console.log(currentArea?.id);

//   const [fecha_inicio, fecha_fin] = useMemo(() => {
//     if (!range) return ["", ""];
//     return [timeFormat("%Y-%m-%d")(range[0]), timeFormat("%Y-%m-%d")(range[1])];
//   }, [range]);

//   const { data, error, isLoading } = useSWR(
//     ["Consultas/listarReporteReservoriosGas", codigo_m, loc_codigo, fecha_inicio, fecha_fin],
//     (args) => getResGraficasAPI(...args)
//   );
  

//   const headersReporte = useMemo<ReporteResRowType>(() => {
//     let headers = { fecha: "Fecha",
//           locacion:"Locación",
//           longitud:"Longitud",
//           volumen:" Volumen",
//           señal:"Señal",
//           estado:"Estado"
//    };
//     if (!data) return headers;
//     data.headers.forEach((h) => {
//       headers = { ...headers };
//     });
//     console.log("soy las cabceceras");
    
//     console.log(headers);
//     return headers;
//   }, [data]);

//   const dataReporte = useMemo<ReporteResRowType[]>(() => {
//     let dataReporte: ReporteResRowType[] = [];
//     if (!data) return [];
//     data.data.forEach((d) => {

//       // if (dataReporte[0]?.fecha === d.report_fechahora) {
//       //   // dataReporte[0] = {
//       //   //   ...dataReporte[0],
//       //   // };
//       //   return;
//       // }
//       dataReporte = [
//         {
//           fecha: d.report_fechahora,
//           locacion: d.report_locacion,
//           longitud: d.report_longitud,
//           volumen: d.report_volumen,
//           señal: d.report_signal,
//           estado: d.report_estado,


//       },
//       ...dataReporte,
//       ];
//     });
//     return dataReporte;
//   }, [data]);

//   return { headersReporte, dataReporte, error, isLoading };
  
// }

// export function useReporteResApi(
//   codigo_m: string,
//   loc_codigo: string,
//   range: RangeT
// ) {
//   const [fecha_inicio, fecha_fin] = useMemo(() => {
//     if (!range) return ["", ""];
//     return [timeFormat("%Y-%m-%d")(range[0]), timeFormat("%Y-%m-%d")(range[1])];
//   }, [range]);

//   const { data, error, isLoading } = useSWR(
//     ["Consultas/listarReporteReservoriosGas", codigo_m, loc_codigo, fecha_inicio, fecha_fin],
//     (args) => getResGraficasAPI(...args)
//   );

//   const headersReporte = useMemo<ReporteResRowType>(() => {
//     let headers = { fecha: "Fecha" };
//     if (!data) return headers;

//     // Filtrar solo las cabeceras del reservorio 1
//     data.headers
//       .filter((h) => h.dispositivo_imei === "865234067076199")
//       .forEach((h) => {
//         headers = { ...headers, [h.dispositivo_imei]: h.locacion_nombre };
//       });

//     console.log("soy las cabeceras");
//     console.log(headers);
//     return headers;
//   }, [data]);

//   const dataReporte = useMemo<ReporteResRowType[]>(() => {
//     if (!data) return [];

//     // Filtrar solo los datos del reservorio 1
//     const filteredData = data.data.filter(
//       (d) => d.report_dispositivo === "865234067076199"
//     );

//     // Mapear los datos filtrados a la estructura deseada
//     const mappedData = filteredData.map((d) => ({
//       fecha: d.report_fechahora,
//       volumen: d.report_volumen,
//       [d.report_dispositivo]: d.report_locacion,
//       // Agregar otras propiedades según sea necesario
//     }));

//     console.log("soy datos que van a reporte");
//     console.log(mappedData);

//     return mappedData;
//   }, [data]);

//   return { headersReporte, dataReporte, error, isLoading };
// }


// export function useReporteResApi(
//   codigo_m: string,
//   loc_codigo: string,
//   range: RangeT
// ) {
//   const [fecha_inicio, fecha_fin] = useMemo(() => {
//     if (!range) return ["", ""];
//     return [timeFormat("%Y-%m-%d")(range[0]), timeFormat("%Y-%m-%d")(range[1])];
//   }, [range]);

//   const { data, error, isLoading } = useSWR(
//     ["Consultas/listarReporteReservoriosGas", codigo_m, loc_codigo, fecha_inicio, fecha_fin],
//     (args) => getResGraficasAPI(...args)
//   );

//   const headersReporte = useMemo<ReporteResRowType>(() => {
//     let headers = { 
//       fecha: "Fecha", 
//       longitud:"Longitud",
//       report_locacion:"Locación",
//       report_dispositivo:"report_dispositivo",
//       report_longitud:"Longitud",
//       report_volumen:" Volumen",
//       report_estado:"Estado"
//     };
//     if (!data) return headers;

//     // Filtrar solo las cabeceras del reservorio 1
//     data.headers
//       .filter((h) => h.dispositivo_imei === "865234067076199")
//       .forEach((h) => {
//         headers = { ...headers };
//       });

//     console.log("soy las cabeceras");
//     console.log(headers);
//     return headers;
//   }, [data]);

//   const dataReporte = useMemo<ReporteResRowType[]>(() => {
//     if (!data) return [];

//     // Filtrar solo los datos del reservorio 1
//     const filteredData = data.data.filter(
//       (d) => d.report_dispositivo === "865234067076199"
//     );

//     // Mapear los datos filtrados a la estructura deseada
//     const mappedData = filteredData.map((d) => {
//       const rowData: ReporteResRowType = {
//         fecha: d.report_fechahora,
//         longitud: d.report_longitud,
        
//         // [d.report_dispositivo]: d.report_longitud,
//         // [d.report_dispositivo]: d.report_longitud,

//         // Agregar otras propiedades según sea necesario
//       };

//       // Agregar las mismas propiedades de encabezado a cada fila
//       Object.keys(headersReporte).forEach((key) => {
//         if (!(key in rowData)) {
//           rowData[key] = d[key];
//         }
//       });

//       return rowData;
//     });

//     console.log("soy datos que van a reporte");
//     console.log(mappedData);

//     return mappedData;
//   }, [data, headersReporte]);

//   return { headersReporte, dataReporte, error, isLoading };
// }
