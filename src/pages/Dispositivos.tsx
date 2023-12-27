import React from "react";
import DispositivosContainer from "../components/config/dispositivos/DispositivosContainer";
import NewDispositivoContainer from "../components/new-dispositivo/NewDispositivoContainer";

export default function Dispositivos() {
  return (
    <div className="container-fluid py-4 px-lg-5">
      <div className="row gy-4 justify-content-center">
        <div className="col-12 col-lg-10 col-xxl-4">
          <NewDispositivoContainer />
        </div>
        <div className="col-12 col-xxl-8">
          <DispositivosContainer />
        </div>
      </div>
    </div>
  );
}
