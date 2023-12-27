import React from "react";
import { Routes, Route } from "react-router-dom";
import Escritorio from "../pages/Escritorio";
import Configuracion from "../pages/Configuracion";
import Reportes from "../pages/Reportes";
import Graficas from "../pages/Graficas";
import Alertas from "../pages/Alertas";
import Reservorios from "../pages/Reservorios";
import Layout from "../pages/Layout";
import SignIn from "../pages/Signin";
import Areas from "../pages/Areas";
import Dispositivos from "../pages/Dispositivos";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/" element={<Layout />}>
     
        <Route path="escritorio" element={<Escritorio />}></Route>
        <Route path="reservorios" element={<Reservorios />}></Route>
        <Route path="configuracion" element={<Configuracion />}></Route>
        <Route path="reportes" element={<Reportes />}></Route>
        <Route path="graficos" element={<Graficas />}></Route>
        <Route path="alertas" element={<Alertas />}></Route>
        <Route path="dispositivos" element={<Dispositivos />}></Route>
        <Route path="areas" element={<Areas />}></Route>
      </Route>
    </Routes>
  );
}

export default MyRoutes;
