import React, { useEffect } from "react";
import ConfigBarContainer from "../components/reservorios/config-bar/ConfigBarContainer";
import NivelGraficaContainer from "../components/reservorios/nivel-grafica/NivelGraficaContainer";
import NivelReservoriosContainer from "../components/reservorios/nivel-reservorios/NivelReservoriosContainer";
import ResumeContainer from "../components/reservorios/resumen/ResumeContainer";
import AreaGraficaProvider from "../store/AreaGraficaProvider";
import { useAppStore } from "../store/store";
import { moverFecha } from "../utilities/date-utils";

export default function Reservorios() {
  const getResGraficas = useAppStore((state) => state.getResGraficas);
  useEffect(() => {
    getResGraficas([moverFecha(new Date(), 0), moverFecha(new Date(), 0)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="">
    <AreaGraficaProvider>
      <div style={{ margin: '0 auto', maxWidth: '90%' }} >
        <div className="">
          <ConfigBarContainer />
        </div>
        <div className="mt-4">
          <ResumeContainer />
        </div>
        <div className="mt-4">
          <NivelReservoriosContainer />
        </div>
        <div className="mt-4">
          <NivelGraficaContainer />
        </div>
      </div>
    </AreaGraficaProvider>
    </div>
  );
}
