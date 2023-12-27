import { MUIDataTableProps } from "mui-datatables";
import React, { useMemo } from "react";
import { AlertaAPIType } from "../../api/alertas-api";
import MUITable from "../common/table/MUITable";

interface Props {
  alertaList: AlertaAPIType[];
}
export default function AlertasTable(props: Props) {
  const alertaList = useMemo(
    () =>
      props.alertaList.map((row) => ({
        ...row,
        alert_fecha_hora: `${row.alert_fecha} ${row.alert_hora}`,
      })),
    [props.alertaList]
  );

  const alertaColumns: MUIDataTableProps["columns"] = useMemo(
    () => [
      {
        name: "alert_area",
        label: "Area",
      },
      { name: "alert_sensor_nom", label: "Dispositivo" },
      { name: "alert_fecha_hora", label: "Fecha / Hora" },
      {
        name: "alert_temp",
        label: "Temp.",
        options: { customBodyRender: (v) => `${v} °C` },
      },
      {
        name: "alert_hum",
        label: "Humed.",
        options: { customBodyRender: (v) => `${v} %` },
      },
      { name: "alert_tipo", label: "Motivo" },
      { name: "alert_last_up", label: "Ultimo cambio" },
      {
        name: "alert_status",
        label: "Estado",
        options: {
          customBodyRender: (v) =>
            v === "activo" ? (
              <span className="text-danger">ACTIVO</span>
            ) : (
              <span className="text-primary">SOLUCIONADO</span>
            ),
        },
      },
    ],
    []
  );
  return (
    <MUITable
      title=""
      columns={alertaColumns}
      data={alertaList}
      options={{ pagination: false }}
    />
  );
}
