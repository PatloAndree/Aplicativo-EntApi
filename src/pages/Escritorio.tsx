import React, { useState, useEffect } from "react";
import CameraListContainer from "../components/cameras/cameras/CameraListContainer";
import ResumenContainer from "../components/cameras/resumen/ResumenContainer";
import GasBalloon from "../components/gas/GasBalloon";
import ResumenContainerBalones from "../components/gas/ResumenBalones/ResumenContainerBalones";
import BalonContainer from "../components/gas/Balones/BalonContainer";
import { UserAPIType } from "../api/auth-api";
import { getLocal } from "../services/local-storage";
import Map from "../components/congeladoras/Mapa/Mapa";
import MapaContainer from "../components/congeladoras/Mapa/MapaContainer";


export default function Escritorio() {

  const user = getLocal<UserAPIType>("user");

  const [perfil, setPerfil] = useState(1);
  const [percentage, setPercentage] = useState<number>(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prevPercentage => (prevPercentage + 10) % 101); // Incrementa en 10 y cicla entre 0 y 100
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-fluid py-4 px-lg-5">
      {
        user?.id == 9  ? 
            <div >
                <div>
                    <MapaContainer/>
                </div>
            </div>
        :
        user?.id == 7   ?
            <div >
                <div >
                    <ResumenContainerBalones/>
                  </div>
                <div >
                    <BalonContainer/>
                </div>
            </div>
        :
            <div>
                <div>
                  <ResumenContainer />
                </div>
                <div className="mt-4">
                  <CameraListContainer />
                </div>
            </div>
      }
    </div>
  );
}
