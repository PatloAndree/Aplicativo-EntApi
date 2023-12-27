import React, { useEffect, useMemo, useState } from "react";
import SelectAreaContainer from "../components/graficas/select/SelectAreaContainer";
import SelectDispositivoContainer from "../components/graficas/select/SelectDispositivoContainer";
import SelectRangeContainer from "../components/graficas/select/SelectRangeContainer";
import ReporteContainer from "../components/reporte/ReporteContainer";
import ReporteContainer2 from "../components/reporte/ReporteContainer2";
import { UserAPIType } from "../api/auth-api";
import { getLocal } from "../services/local-storage";
import SelectReservorio from "../components/graficas/select/SelectReservorio";
import AreaGraficaProvider from "../store/AreaGraficaProvider";

function Reportes() {
  const user = getLocal<UserAPIType>("user");
  const [responseData, setResponseData] = useState(null);

  return (
    <AreaGraficaProvider>
      <div className="container-fluid py-4 px-lg-5">
        <div>
        
        </div>
        <div className="d-flex gap-4 flex-wrap">
          {/* <SelectAreaContainer /> */}
          <SelectDispositivoContainer />
          <SelectRangeContainer />
        </div>
        <div className="mt-4">
          {
            user?.id == 8  
            ? 
              <ReporteContainer2 />
            :
              <ReporteContainer /> 
          }
        </div>
        
      </div>
    </AreaGraficaProvider>
  );
}

export default Reportes;
