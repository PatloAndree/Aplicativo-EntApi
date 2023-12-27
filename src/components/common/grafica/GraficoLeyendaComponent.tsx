// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { coloresList } from "./colores";
// import { AccessorsType, GraficaTemporal, SeriesVisType } from "./GraficaTemporal";
// import Leyenda from "./Leyenda";
// import GraficoBarra from "../../gas/GraficoBarra/GraficoBarra";

// // Establece un estilo para el div contenedor
// const containerStyle = {
//   overflow: "auto", 
//   width: "100%", 
//   height: "100%",
// };

// interface SeriesType<DatumT> {
//   trama: DatumT[];
//   label: string;
// }

// interface Props<DatumT> {
//   className?: string;
//   title?: string;
//   timeDomain: [Date, Date];
//   series: SeriesType<DatumT>[];
//   unidad: string;
//   accessors: AccessorsType<DatumT>;
// }

// export default function GraficoLeyendaComponent<DatumT extends {}>({
//   className,
//   title,
//   series,
//   ...graficoProps
// }: Props<DatumT>) {
//   const [seriesVis, setSeriesVis] = useState<SeriesVisType<DatumT>[]>([]);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     setSeriesVis(
//       series.map((serie, id) => ({
//         id,
//         trama: serie.trama,
//         label: serie.label,
//         showSeries: true,
//         color: coloresList[id],
//       }))
//     );
//   }, [series]);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const seriesLegend = useMemo(
//     () => seriesVis.map(({ id, label, color }) => ({ id, label, color })),
//     [seriesVis]
//   );

//   const toggleSeries = useCallback(
//     (id: number) => {
//       setSeriesVis((prevSeriesVis) =>
//         prevSeriesVis.map((serie) => {
//           if (serie.id === id) return { ...serie, showSeries: !serie.showSeries };
//           return serie;
//         })
//       );
//     },
//     []
//   );

//   // Ajusta el tamaño del gráfico en función de windowSize.width y windowSize.height
//   const width = windowSize.width; // Porcentaje del ancho de la ventana
//   const height = 300; 

//   return (
//     <div style={containerStyle} className="responsive-chart-container">
//       <>
//         <div className="ps-5">
//           <Leyenda
//             title={title}
//             seriesLegend={seriesLegend.map((serie, index) => ({
//               ...serie,
//               // label: `Reservorio 0${index + 1}`,
//             }))}
//             toggleSeries={toggleSeries}
//           />
//         </div>
//         {/* <GraficoBarra /> */}
//         <GraficaTemporal<DatumT>
//           width={width}
//           height={height}
//           seriesVis={seriesVis}
//           {...graficoProps}
//         />
//       </>
//     </div>
//   );
// }

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { coloresList } from "./colores";
import { AccessorsType, GraficaTemporal, SeriesVisType } from "./GraficaTemporal";
import Leyenda from "./Leyenda";
import GraficoBarra from "../../gas/GraficoBarra/GraficoBarra";

// Establece un estilo para el div contenedor
const containerStyle = {
  overflow: "auto", 
  width: "100%", 
  height: "100%",
};

interface SeriesType<DatumT> {
  trama: DatumT[];
  label: string;
}

interface Props<DatumT> {
  className?: string;
  title?: string;
  timeDomain: [Date, Date];
  series: SeriesType<DatumT>[];
  unidad: string;
  accessors: AccessorsType<DatumT>;
}

export default function GraficoLeyendaComponent<DatumT extends {}>({
  className,
  title,
  series,
  ...graficoProps
}: Props<DatumT>) {
  const [seriesVis, setSeriesVis] = useState<SeriesVisType<DatumT>[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setSeriesVis(
      series.map((serie, id) => ({
        id,
        trama: serie.trama,
        label: serie.label,
        showSeries: true,
        color: coloresList[id],
      }))
    );
  }, [series]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const seriesLegend = useMemo(
    () => seriesVis.map(({ id, label, color }) => ({ id, label, color })),
    [seriesVis]
  );

  const toggleSeries = useCallback(
    (id: number) => {
      setSeriesVis((prevSeriesVis) =>
        prevSeriesVis.map((serie) => {
          if (serie.id === id) return { ...serie, showSeries: !serie.showSeries };
          return serie;
        })
      );
    },
    []
  );

  const width = windowSize.width; // Porcentaje del ancho de la ventana
  const height = 400; // Altura fija del gráfico

  return (
    <div style={containerStyle} className="responsive-chart-container">
      <>
        <div className="ps-5">
          <Leyenda
            title={title}
            seriesLegend={seriesLegend.map((serie, index) => ({
              ...serie,
              // label: `Reservorio 0${index + 1}`,
            }))}
            toggleSeries={toggleSeries}
          />
        </div>
        {/* <GraficoBarra /> */}
        <GraficaTemporal<DatumT>
          width={width}
          height={height}
          seriesVis={seriesVis}
          {...graficoProps}
        />
      </>
    </div>
  );
}