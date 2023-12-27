import React, { useState } from "react";
import CardWidget from "../../common/card-widget/CardWidget";
import BarraCard from "../BarraSuperrior/BarraCard";
import Map from "./Mapa";
import Tabla from "../TablaGeneral/Tabla";
import AgruparLocaciones from "../Formularios/AgruparLocaciones";
import ListaAgrupada2 from "../Formularios/ListaAgrupada2";
import Tabla2 from "../TablaGeneral/Tabla2";

export default function MapaContainer() {
  const [activeTab, setActiveTab] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const toggleColumns = () => {
    setExpanded(!expanded);
  };

  const renderTabContent = () => {
    if (activeTab === 1) {
      return <Map />;
    } else if (activeTab === 2) {
      return <Tabla />;
    } else {
      return null; 
    }
  };

  return (
    // <div className={`row ${expanded ? 'expanded' : ''}`}>
    <div className="row">


      <div className="col-12 col-md-12 col-xl-2 rounded-1 border">
      {/* <div className={`col-12 col-md-6 col-xl-${expanded ? '2' : '2'} rounded-1 border`}> */}
          <div className="rounded-1  m-1 mt-4">
              <ListaAgrupada2/>
              {/* <button onClick={toggleColumns}>+</button> */}
          </div>
      </div>

      <div className="col-12 col-md-12 col-xl-10 ">
        <CardWidget title={"Leyenda congeladoras"} toolbar={true}>
          <BarraCard />
        </CardWidget>
        <br />
        <div className="d-flex">
          <button
              className={`btn ${activeTab === 1 ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab(1)}
              >
              <span style={{fontSize:14}}>Vista de mapa</span> 
              </button>
              <button
              className={`btn ${activeTab === 2 ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveTab(2)}
              >
              <span style={{fontSize:14}}>Lista general de congeladoras</span> 

          </button>
        </div>

        {renderTabContent()}

      </div>

    </div>
  );
}
