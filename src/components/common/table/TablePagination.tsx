import React, { ReactNode, useMemo, useState } from "react";
import Paginacion from "../paginacion/Paginacion";

interface Props<RowT> {
  itemsPerPage: number;
  dataLista: RowT[];
  render: (lista: RowT[]) => ReactNode;
}
export default function TablePagination<RowT>(props: Props<RowT>) {
  const [page, setPage] = useState(1);
  const pageCount = useMemo(
    () => Math.ceil(props.dataLista.length / props.itemsPerPage),
    [props.dataLista, props.itemsPerPage]
  );

  const pageLista = useMemo(
    () =>
      props.dataLista.slice(
        props.itemsPerPage * (page - 1),
        props.itemsPerPage * page
      ),
    [props.itemsPerPage, props.dataLista, page]
  );

  return (
    <>
      {props.render(pageLista)}
      <div className="d-flex justify-content-end pt-3">
        <Paginacion
          pageCount={pageCount || 1}
          onPageChange={(item) => {
            setPage(item.selected + 1);
          }}
        />
      </div>
    </>
  );
}
