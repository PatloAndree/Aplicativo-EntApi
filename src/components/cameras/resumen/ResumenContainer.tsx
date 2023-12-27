import React from "react";
import { useResumenAPI } from "../../../api-state/useResumenAPI";
import { useAppStore } from "../../../store/store";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";

export default function ResumenContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { resumen, isLoading, error } = useResumenAPI(`${id}`);
  if (isLoading || !resumen) return <Loading className="my-5" />;
  if (error) return <ErrorMessage message="Error al cargar los datos." />;
  return (
    <div className="row gy-4">
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Total de áreas"
          className="bg-success bg-opacity-50"
          counter={resumen.areas_total}
          icon={<i className="bi bi-fullscreen"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Dispositivos"
          className="bg-info bg-opacity-50"
          counter={resumen.dispositivos_total}
          icon={<i className="bi bi-cpu"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Alertas"
          className="bg-danger bg-opacity-50"
          counter={resumen.alertas_total}
          icon={<i className="bi bi-exclamation-triangle"></i>}
          to="/alertas"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Gráficas"
          className=" bg-warning bg-opacity-50"
          icon={<i className="bi bi-graph-up"></i>}
          to="/graficos"
        />
      </div>
    </div>
  );
}
