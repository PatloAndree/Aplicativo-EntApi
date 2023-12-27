import { MUIDataTableProps } from "mui-datatables";
import React, { useMemo, useState, useEffect } from "react";
import { AlertaAPIType } from "../../api/alertas-api";
import { AlertaAPITypeRes } from "../../api/resAlertas-api";
import axios from "axios";
import MUITable from "../common/table/MUITable";

interface Props {
  alertaLista: AlertaAPIType[];
}
export default function AlertasReservorio(props: Props) {

  const [alertaLista, setAlertaLista] = useState<AlertaAPIType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.post(
            "https://entel-iot.pe/API_ENTEL/api/Consultas/listaAlertasReservoriosGas",
            {
              master: "8",
              tipo: "reservorio",
            }
          );
          const data = response.data.listaDatos; 
          setAlertaLista(data.map((row:any) => ({ ...row, alert_fecha_hora: `${row.alerta_fechahora}` })));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    fetchData(); 
  }, []); 


  const alertaColumns: MUIDataTableProps["columns"] = useMemo(
    () => [
      {
        name: "alerta_locacion",
        label: "Reservorio",
      },
      { name: "alert_fecha_hora", label: "Fecha / Hora" },
      { name: "alerta_longitud", label: "Longitud" },
      { name: "alerta_volumen", label: "Volumen" },
      { name: "alerta_signal", label: "Señal" },
      {
        name: "alerta_motivo",
        label: "Motivo",
        options: {
          customBodyRender: (v) =>
              <span className="text-primary">{v}</span>
        },
      },
    ],
    []
  );
  return (
    <MUITable
      title=""
      columns={alertaColumns}
      data={alertaLista}
      options={{ pagination: false }}
    />
  );
}