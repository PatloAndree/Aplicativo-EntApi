import React from "react";

import CardWidget from "../../common/card-widget/CardWidget";
import AreaGraficaBalonContainer from "./AreaGraficaBalonContainer";


export default function GraficaBalonContainer() {
//   const { currentArea } = useAreaGraficaContext();

//   if (!currentArea) return null;
  return (
    
      <div className="py-4 px-4 px-lg-5 row gx-4 gy-5">
        <div className="col-12 col-xl-8">
          <AreaGraficaBalonContainer />

        </div>
        <div className="col-12 col-xl-4">
          <div className="pt-5 pb-4">
          <span>mis graficos</span>

          </div>
        </div>
      </div>
    
  );
}
