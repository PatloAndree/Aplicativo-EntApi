import React from "react";
import { useAreaDevices } from "../../../api-state/useAreaDevicesAPI";
import { useAppStore } from "../../../store/store";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import CameraDevices from "./CameraDevices";
import CameraOneDevice from "./CameraOneDevice";

export default function CameraListContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { areaList, isLoading, error } = useAreaDevices(`${id}`);

  if (isLoading || !areaList) return <Loading className="my-5" />;
  if (error) return <ErrorMessage message="Error al cargar la data." />;
  return (
    <div className="row gy-4 ">
      {areaList.map((area) => (
        <div
          key={area.loc_id}
          className={`col-12 ${
            area.loc_devices.length === 1 ? "" : "col-xl-6"
          }`}
        >
          {area.loc_devices.length === 1 ? (
            <CameraOneDevice
              cameraName={area.loc_nombre}
              device={area.loc_devices[0]}
            />
          ) : (
            <CameraDevices
              cameraName={area.loc_nombre}
              deviceList={area.loc_devices}
            />
          )}
        </div>
      ))}
    </div>
  );
}
