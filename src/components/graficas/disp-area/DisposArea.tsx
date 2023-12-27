import React, { CSSProperties } from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import { ReactComponent as BtnGreen } from "../../../assets/btn-green.svg";
import { ReactComponent as BtnRed } from "../../../assets/btn-red.svg";

interface Props {
  dispos: DispositivoAPIType[];
}

const radius = 16;
const btnStyle: CSSProperties = { width: 2 * radius, height: 2 * radius };

export default function DisposArea(props: Props) {
  return (
    <div className="row justify-content-center gy-4">
      {props.dispos.map((dev) => (
        <div className="col-md-4 col-6 text-secondary" key={dev.dis_id}>
          <div>
            {dev.temp > +dev.dis_maxt ||
            dev.temp < +dev.dis_mint ||
            dev.hum > +dev.dis_maxh ||
            dev.hum < +dev.dis_minh ? (
              <BtnRed style={btnStyle} />
            ) : (
              <BtnGreen style={btnStyle} />
            )}
          </div>
          <div className="my-2">{dev.dis_nom}</div>
          <div className="d-flex align-items-center">
            <i className="me-1 fs-5 bi bi-thermometer-half text-secondary"></i>
            <span>{dev.temp.toFixed(1)} °C</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="me-1 fs-5 bi bi-droplet-half text-secondary"></i>
            <span>{dev.hum.toFixed(1)} %</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="me-1 fs-5 bi bi-battery-half text-secondary"></i>
            <span>{dev.bat.toFixed(1)} %</span>
          </div>
        </div>
      ))}
    </div>
  );
}
