import React from "react";
import { useAreaGraficaContext } from "../../store/AreaGraficaProvider";
import CardWidget from "../common/card-widget/CardWidget";
import AreaGraficaContainer from "./AreaGraficaContainer";
import DisposAreaContainer from "./disp-area/DisposAreaContainer";
import AreaValuesContainer from "./disp-area/AreaValuesContainer";

export default function GraficaCard() {
  const { currentArea } = useAreaGraficaContext();

  if (!currentArea) return null;
  return (
    <CardWidget title={currentArea.name} toolbar={true}>
      <div className="py-4 px-4 px-lg-5 row gx-4 gy-5">
        <div className="col-12 col-xl-8">
          <AreaGraficaContainer />
        </div>
        <div className="col-12 col-xl-4">
          <DisposAreaContainer />
          <div className="pt-5 pb-4">
            <AreaValuesContainer />
          </div>
        </div>
      </div>
    </CardWidget>
  );
}
