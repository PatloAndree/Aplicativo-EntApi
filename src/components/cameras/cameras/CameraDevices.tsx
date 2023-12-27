import { useMemo } from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import CardWidget from "../../common/card-widget/CardWidget";
import CameraDiagramRes from "./CameraDiagramRes";

interface Props {
  cameraName: string;
  deviceList: DispositivoAPIType[];
}
export default function CameraDevices({ cameraName, deviceList }: Props) {
  const tempPromedio = useMemo(
    () =>
      deviceList.reduce<number>((temp, dev) => temp + +dev.temp, 0) /
      deviceList.length,
    [deviceList]
  );
  const humePromedio = useMemo(
    () =>
      deviceList.reduce<number>((temp, dev) => temp + +dev.hum, 0) /
      deviceList.length,
    [deviceList]
  );

  return (
    <CardWidget title={cameraName} toolbar={true}>
      <div className="d-flex justify-content-center m-4 align-items-center gap-4 flex-wrap">
        <div className="w-100" style={{ maxWidth: 450 }}>
          <CameraDiagramRes deviceList={deviceList} />
        </div>

        <div className="d-flex flex-md-column flex-xl-row flex-xxl-column justify-content-center align-items-end gap-3">
          <div className="d-flex flex-column align-items-end">
            <div className="text-secondary" style={{ fontSize: "small" }}>
              Temperatura Promedio
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">{tempPromedio.toFixed(1)} °C</span>
              <i className="fs-2 bi bi-thermometer-half text-danger"></i>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="text-secondary" style={{ fontSize: "small" }}>
              Humedad Promedio
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fs-5">{humePromedio.toFixed(1)} %</span>
              <i className="fs-2 bi bi-droplet-half text-info"></i>
            </div>
          </div>
        </div>
      </div>
    </CardWidget>
  );
}
