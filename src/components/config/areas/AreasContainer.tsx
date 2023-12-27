import { useCallback, useState } from "react";
import { useAreasAPI } from "../../../api-state/useAreasAPI";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import CardWidget from "../../common/card-widget/CardWidget";
import { CameraAPIType, updateAreaAPI } from "../../../api/cameras-api";
import { useAppStore } from "../../../store/store";
import SuccessMessage from "../../common/message/SuccessMessage";
import AreaLista from "./AreaLista";
import TablePagination from "../../common/table/TablePagination";
import TableFilter from "../../common/table/TableFilter";

export default function AreasContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { areaLista, error, isLoading, mutate } = useAreasAPI(`${id}`);

  const [editState, setEditState] = useState({
    error: false,
    success: false,
    loading: false,
  });
  const onEdit = useCallback(
    async (a: CameraAPIType) => {
      setEditState({ error: false, success: false, loading: true });
      const areaUpdate = {
        id: `${a.loc_id}`,
        descripcion: a.loc_descripcion,
        estado: a.loc_status,
        max_temperatura: a.loc_max_temp,
        min_temperatura: a.loc_min_temp,
        max_humedad: a.loc_max_hume,
        min_humedad: a.loc_min_hume,
      };

      try {
        await updateAreaAPI(areaUpdate);
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
    { label: "Nombre", key: "loc_nombre" },
    { label: "Descripción", key: "loc_descripcion" },
    { label: "Máx. Temp", key: "loc_max_temp" },
    { label: "Mín. Temp", key: "loc_min_temp" },
    { label: "Máx. Hume", key: "loc_max_hume" },
    { label: "Mín. Hume", key: "loc_min_hume" },
    { label: "Status", key: "loc_status" },
    { label: "Conexión del gateway", key: "loc_status" },
  ];

  if (isLoading) return <Loading className="my-5" />;
  if (error || !areaLista)
    return (
      <ErrorMessage className="my-4" message="Error al cargar configuración." />
    );
  return (
    <CardWidget title="Configurar áreas registradas." toolbar={true}>
      <div className="p-4 pb-2">
        <TableFilter
          dataLista={areaLista}
          headersCSV={headersCSV}
          render={(listaFiltered) => (
            <TablePagination
              itemsPerPage={10}
              dataLista={listaFiltered}
              render={(lista) => (
                <AreaLista
                  onEdit={onEdit}
                  areaLista={lista}
                  editLoading={editState.loading}
                />
              )}
            />
          )}
        />

        {editState.error && (
          <ErrorMessage className="mt-3" message="Error al actualizar área." />
        )}
        {editState.success && (
          <SuccessMessage className="mt-3" message="Area actualizada." />
        )}
      </div>
    </CardWidget>
  );
}
