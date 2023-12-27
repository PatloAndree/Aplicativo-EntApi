import React from "react";
import AlertasHistorial from "../components/alertas/AlertasHistorial";
import AlertasPendientes from "../components/alertas/AlertasPendientes";
import { UserAPIType } from "../api/auth-api";
import { getLocal } from "../services/local-storage";

function Alertas() {
  const user = getLocal<UserAPIType>("user");


  return (
    <div className="container my-5">

      {
         user?.id == 8  ? 
          <div>
              <div>
                <AlertasPendientes />
              </div>
          </div>
         :
         <div>
            <div>
              <AlertasPendientes />
            </div>
            <div className="mt-4">
              <AlertasHistorial />
            </div>
          </div>

      }
    </div>
  );
}

export default Alertas;
