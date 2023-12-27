import React, { useEffect, useMemo, useState } from "react";
import { AlertaAPIType } from "../../api/alertas-api";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";

interface Props {
  alertaList: AlertaAPIType[];
}

const [alertaListA, setAlertaList] = useState<AlertaAPIType[] | null>(null);

const headersCSV = [
  { label: "Area", key: "dis_nom" },
  { label: "Dispositivo", key: "loc_nom" },
  { label: "Fecha/Hora", key: "dis_maxt" },
  { label: "Temp./Humed", key: "dis_mint" },
  { label: "TMotivo", key: "dis_maxh" },
  { label: "Estado", key: "dis_minh" },
];


export default function AlertasPage(props: Props) {
  return (
    <div>

    <TableFilter
          dataLista={headersCSV}
          headersCSV={headersCSV}
          render={(listaFiltered) => (
            <TablePagination
            itemsPerPage={10}
            dataLista={listaFiltered}
            render={(lista) => (
              <table className="table" style={{ fontSize: "small" }}>
                <thead>
                  <tr>
                    <th className="px-4">Area 1</th>
                    <th className="px-4">Dispositivo</th>
                    <th className="px-4">Fecha/Hora</th>
                    <th className="px-4">Temp./Humed.</th>
                    <th className="px-4">Motivo</th>
                    <th className="px-4">Ultimo cambio</th>
                    <th className="px-4">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-dark text-opacity-75">
                  {props.alertaList.map((alerta, j) => (
                    <tr key={j}>
                      <td className="px-4">{alerta.alert_area}</td>
                      <td className="px-4">{alerta.alert_sensor_nom}</td>
                      <td className="px-4">
                        {alerta.alert_fecha} / {alerta.alert_hora}
                      </td>
                      <td className="px-4">
                        {alerta.alert_temp} / {alerta.alert_hum}
                      </td>
                      <td className="px-4">{alerta.alert_tipo}</td>
                      <td className="px-4">{alerta.alert_last_up}</td>
                      <td className="px-4">
                        {alerta.alert_status === "activo" ? (
                          <span className="text-danger">ACTIVO</span>
                        ) : (
                          <span className=" text-primary">SOLUCIONADO</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            )}
            />
            )}
          />

    </div>
  );
}
