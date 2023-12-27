import React, { useEffect, useMemo, useState } from "react";
import { useAlertasAPI } from "../../api-state/useAlertasAPI";
import { useAppStore } from "../../store/store";
import AlertasTable from "./AlertasTable";
import AlertasReservorio from "./AlertasReservorio";
import TableFilter from "../common/table/TableFilter";
import TablePagination from "../common/table/TablePagination";
import { getLocal } from "../../services/local-storage";
import { UserAPIType } from "../../api/auth-api";



interface Props {
  page: number;
  tipoStr: "pendientes" | "historial";
}
export default function AlertasPageContainer(props: Props) {
  const id = useAppStore((state) => state.user?.id);
  const user = getLocal<UserAPIType>("user");

  const tipo = useMemo(
    () => (props.tipoStr === "pendientes" ? "1" : "0"),
    [props]
  );
  const { alertas } = useAlertasAPI(`${id}`, props.page, tipo);

  const headersCSV = [
    { label: "Area", key: "dis_nom" },
    { label: "Dispositivo", key: "loc_nom" },
    { label: "Fecha/Hora", key: "dis_maxt" },
    { label: "Temp./Humed", key: "dis_mint" },
    { label: "ultimo Cambio", key: "dis_mint" },
    { label: "Motivo", key: "dis_maxh" },
    { label: "Estado", key: "dis_minh" },
  ];

  console.log(alertas);
  return <div> 
     <TableFilter
          dataLista={headersCSV}
          headersCSV={headersCSV}
          render={(listaFiltered) => (
            <TablePagination
            itemsPerPage={10}
            dataLista={listaFiltered}
            render={(lista) => (
              user?.id == 8  ? 
                <AlertasReservorio alertaLista={alertas || []} /> 
                
              :
                <AlertasTable alertaList={alertas || []} /> 
              )}
              />
              )}
            />
              
    </div>
}
