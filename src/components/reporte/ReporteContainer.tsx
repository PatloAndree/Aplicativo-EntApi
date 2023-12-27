import React, { useEffect, useMemo, useState } from "react";
import { useReporteAPI } from "../../api-state/useReporteAPI";
import { useReporteDisAPI } from "../../api-state/useReporteDisAPI";
import { useAreaGraficaContext } from "../../store/AreaGraficaProvider";
import { useAppStore } from "../../store/store";
import CardWidget from "../common/card-widget/CardWidget";
import Loading from "../common/loading/Loading";
import ReportTable from "./ReportTable";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";

export default function ReporteContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { timeRange, currentArea } = useAreaGraficaContext();
  const [indice, setIndice] = useState<string | null>(null);
  const [id_locacion, setId_locacion] = useState<string | null>(null);

  // const currentAreaId = currentArea?.id || "100"; 
  useEffect(() => {
    if (currentArea?.id === "0") {
      setIndice('5');
      setId_locacion(currentArea?.locacion);
    } else {
      setIndice('0');
      setId_locacion(currentArea?.id || "100");
    }
  }, [currentArea]);

  const { headersReporte2, dataReporte2,error, isLoading   } = useReporteDisAPI(
    `${id_locacion}`,
    `${indice}`,
    timeRange
  );

  const headers = Object.entries(headersReporte2).map(([key, label]) => ({
    label: label,
    key: key,
  }));
  

  if (isLoading || !dataReporte2 ) return <Loading className="my-5" />;
  if (error) return null;
  return (
    <CardWidget title={`REPORTE ${currentArea?.name}`} toolbar={true}>
      <div className="px-4 py-2">
        <div className="mt-1">
        <TableFilter
          dataLista={dataReporte2}
          headersCSV={headers}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={10}
              dataLista={listaFiltered}
              render={(lista) => (
                <ReportTable headers={headersReporte2} dataReporte={dataReporte2} />
              )}
            />
          )}
        />
        </div>
      </div>
    </CardWidget>
  );
}



// import { useReporteAPI } from "../../api-state/useReporteAPI";
// import { useReporteDisAPI } from "../../api-state/useReporteDisAPI";
// import { useAreaGraficaContext } from "../../store/AreaGraficaProvider";
// import { useAppStore } from "../../store/store";
// import CardWidget from "../common/card-widget/CardWidget";
// import Loading from "../common/loading/Loading";
// import ReportTable from "./ReportTable";

// export default function ReporteContainer() {
//   const id = useAppStore((state) => state.user?.id);
//   const { timeRange, currentArea } = useAreaGraficaContext();

//   const { headersReporte, dataReporte, error, isLoading } = useReporteAPI(
//     `${id}`,
//     currentArea?.id || "100",
//     timeRange
//   );

//   if (isLoading || !dataReporte ) return <Loading className="my-5" />;
//   if (error) return null;
//   return (
//     <CardWidget title={`REPORTE ${currentArea?.name}`} toolbar={true}>
//       <div>
//       {currentArea?.id}
//       </div>
//           <ReportTable headers={headersReporte} dataReporte={dataReporte} />
//     </CardWidget>
//   );
// }