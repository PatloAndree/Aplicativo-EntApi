import React, { useMemo } from "react";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";

export default function ResumeContainer() {
  const instalations = useMemo(() => 1, []);
  const devices = useMemo(() => 3, []);
  const alerts = useMemo(() => 1, []);

  return (
    <div className="row gy-4">
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Total de instalaciones"
          className="bg-success bg-opacity-50"
          counter={instalations}
          icon={<i className="bi bi-fullscreen"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Dispositivos"
          className="bg-info bg-opacity-50"
          counter={devices}
          icon={<i className="bi bi-cpu"></i>}
          to="/configuracion"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Alertas"
          className="bg-danger bg-opacity-50"
          counter={alerts}
          icon={<i className="bi bi-exclamation-triangle"></i>}
          to="/alerts"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3">
        <CardResumeDetails
          titleCounter="Configuración"
          className="bg-warning bg-opacity-50"
          counter={instalations}
          icon={<i className="bi bi-gear"></i>}
          to="/configuracion"
        />
      </div>
    </div>
  );
}
