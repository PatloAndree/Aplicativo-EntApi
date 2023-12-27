import React from "react";

interface Props {
  tempProm: number;
  humeProm: number;
}
export default function DisposProm(props: Props) {
  return (
    <div className="d-flex justify-content-center gap-4 pe-2">
      <div>
        <div className="text-secondary" style={{ fontSize: "small" }}>
          Temperatura Promedio
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="fs-1 bi bi-thermometer-half text-danger"></i>
          <span className="fs-4">{props.tempProm.toFixed(1)} °C</span>
        </div>
      </div>
      <div>
        <div className="text-secondary" style={{ fontSize: "small" }}>
          Humedad Promedio
        </div>
        <div className="d-flex align-items-center gap-2">
          <i className="fs-1 bi bi-droplet-half text-info"></i>
          <span className="fs-4">{props.humeProm.toFixed(1)} %</span>
        </div>
      </div>
    </div>
  );
}
