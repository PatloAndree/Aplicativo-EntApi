import { useCallback, useState } from "react";
import { useAlertasAPI } from "../../api-state/useAlertasAPI";
import CardWidget from "../common/card-widget/CardWidget";
import Loading from "../common/loading/Loading";
import ErrorMessage from "../common/message/ErrorMessage";
import Paginacion from "../common/paginacion/Paginacion";
import AlertasPageContainer from "./AlertasPageContainer";
import { useAppStore } from "../../store/store";

export default function AlertasPendientes() {
  const [page, setPage] = useState<number>(1);
  const id = useAppStore((state) => state.user?.id);
  const { paginas, error, isLoading } = useAlertasAPI(`${id}`, 1, "1");

  const prev = useCallback(
    (page: number) => {
      if (page === 1) return paginas || 1;
      return page - 1;
    },
    [paginas]
  );
  const next = useCallback(
    (page: number) => {
      if (page === paginas) return 1;
      return page + 1;
    },
    [paginas]
  );

  if (isLoading) return <Loading className="my-5" />;
  if (error)
    return <ErrorMessage message="Error al cargar alertas." className="my-3" />;
  return (
    <CardWidget title="Alertas activas" toolbar={true}>
      <div className="mx-5 my-2">
        <div className="d-none">
          <AlertasPageContainer page={prev(page)} tipoStr="pendientes" />
          <AlertasPageContainer page={next(page)} tipoStr="pendientes" />
        </div>
        <div>
          <AlertasPageContainer page={page} tipoStr="pendientes" />
        </div>
        <div className="d-flex justify-content-end pt-3">
          {/* <Paginacion
            pageCount={paginas || 1}
            onPageChange={(item) => {
              setPage(item.selected + 1);
            }}
          /> */}
        </div>
      </div>
    </CardWidget>
  );
}
