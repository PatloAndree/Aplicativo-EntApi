import React from "react";
import GraficaCard from "../components/graficas/GraficaCard";
import SelectAreaContainer from "../components/graficas/select/SelectAreaContainer";
import SelectRangeContainer from "../components/graficas/select/SelectRangeContainer";
import AreaGraficaProvider from "../store/AreaGraficaProvider";

function Graficas() {
  return (
    <AreaGraficaProvider>
      <div className="container-fluid py-4 px-lg-5">
        <div className="d-flex gap-4 flex-wrap">
          <SelectAreaContainer />
          <SelectRangeContainer />
        </div>
        <div className="mt-4">
          <GraficaCard />
        </div>
      </div>
    </AreaGraficaProvider>
  );
}

export default Graficas;
