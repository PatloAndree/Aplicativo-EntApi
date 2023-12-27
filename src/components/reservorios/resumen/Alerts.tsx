import React from "react";
import { BsExclamationTriangle as Triangle } from "react-icons/bs";
import CardWidget from "../../common/card-widget/CardWidget";

export default function Alerts(props: any) {
  const { alerts } = props;
  return (
    <CardWidget title={""} className="bg-warning bg-opacity-50">
      <div className="p-4 m-2">
        <div className="text-secondary">Alertas</div>
        <div className="mt-2 d-flex align-items-center">
          <span className="fs-2">{alerts}</span>
          <span className="ms-auto fs-1 text-secondary">
            <Triangle />
          </span>
        </div>
      </div>
    </CardWidget>
  );
}
