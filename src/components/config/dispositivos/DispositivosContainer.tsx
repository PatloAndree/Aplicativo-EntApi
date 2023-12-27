import { useCallback, useState } from "react";
import CardWidget from "../../common/card-widget/CardWidget";
import {
  DispositivoAPIType,
  updateDispositivoAPI,
} from "../../../api/dispositivos-api";
import { useDispositivosAPI } from "../../../api-state/useDispositivosAPI";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import { useAppStore } from "../../../store/store";
import SuccessMessage from "../../common/message/SuccessMessage";
import TablePagination from "../../common/table/TablePagination";
import DispositivosLista from "./DispositivosLista";
import TableFilter from "../../common/table/TableFilter";
import { getLocal } from "../../../services/local-storage";
import {UserAPIType} from './../../../api/auth-api';
import { API } from "../../../api/api";

export default function DispositivosContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { dispositivoLista, error, isLoading, mutate } = useDispositivosAPI(
    `${id}`
  );

  const [editState, setEditState] = useState({
    error: false,
    success: false,
    loading: false,
  });

  
  const onEdit = useCallback(
    async (d: DispositivoAPIType) => {
      setEditState({ error: false, success: false, loading: true });
      const dispositivoUpdate = {
        id: `${d.dis_id}`,
        loc_id: `${d.dis_locacion}`,
        estado: `${d.dis_status}`,
        max_temperatura: `${d.dis_maxt}`,
        min_temperatura: `${d.dis_mint}`,
        max_humedad: `${d.dis_maxh}`,
        min_humedad:`${ d.dis_minh}`,
      };

      try {
        await updateDispositivoAPI(dispositivoUpdate);

        mutate();
        setEditState({ ...editState, success: true, loading: false });
      } catch (e) {
        setEditState({ ...editState, error: true, loading: false });
        mutate();
      }
    },
    [mutate, editState]
  );

  

  const headersCSV = [
    { label: "Nombre", key: "dis_nom" },
    { label: "Área", key: "loc_nom" },
    { label: "Máx. Temp", key: "dis_maxt" },
    { label: "Mín. Temp", key: "dis_mint" },
    { label: "Máx. Hume", key: "dis_maxh" },
    { label: "Mín. Hume", key: "dis_minh" },
    { label: "Status", key: "dis_status" },
    { label: "Batería", key: "dis_status" },
  ];

  if (isLoading) return <Loading className="my-5" />;
  if (error || !dispositivoLista)
    return (
      <ErrorMessage className="my-4" message="Error al cargar configuración." />
    );
  return (
    <CardWidget title="Configurar dispositivos registrados." toolbar={true}>
      <div className="p-4 pb-2">
        <TableFilter
          dataLista={dispositivoLista}
          headersCSV={headersCSV}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={10}
              dataLista={listaFiltered}
              render={(lista) => (
                <DispositivosLista
                  dispositivoLista={lista}
                  onEdit={onEdit}
                  editLoading={editState.loading}
                />
              )}
            />
          )}
        />

        {editState.error && (
          <ErrorMessage
            className="mt-3"
            message="Error al actualizar dispositivo."
          />
        )}
        {editState.success && (
          <SuccessMessage className="mt-3" message="Dispositivo actualizado." />
        )}
      </div>
    </CardWidget>
  );
}
