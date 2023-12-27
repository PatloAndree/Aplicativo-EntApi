import React from "react";
import { CgSmartphoneChip as Chip } from "react-icons/cg";
import CardWidget from "../../common/card-widget/CardWidget";

export default function Devices(props: any) {
  const { devices } = props;
  return (
    <CardWidget title={""} className="bg-info bg-opacity-25">
      <div className="p-4 m-2">
        <div className="text-secondary">Dispositivos</div>
        <div className="mt-2 d-flex align-items-baseline">
          <span className="fs-2">{devices}</span>
          <span className="ms-auto fs-1 text-secondary">
            <Chip />
          </span>
        </div>
      </div>
    </CardWidget>
  );
}
