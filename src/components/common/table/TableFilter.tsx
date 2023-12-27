import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Toolbar from "./Toolbar";
import { Headers } from "react-csv/components/CommonPropTypes";
import { useReactToPrint } from "react-to-print";

interface Props<RowT> {
  dataLista: RowT[];
  render: (lista: RowT[]) => ReactNode;
  headersCSV: Headers;
}
export default function TableFilter<RowT extends {}>(props: Props<RowT>) {
  const [filter, setFilter] = useState("");

  const filteredLista = useMemo(
    () =>
      props.dataLista.filter((row) => {
        for (const v of Object.values(row)) {
          if (`${v}`.toUpperCase().includes(filter.toUpperCase())) return true;
        }
        return false;
      }),
    [filter, props.dataLista]
  );

  const onFilter = useCallback((f: string) => setFilter(f), []);

  const componentToPrint = useRef(null);
  const printTable = useReactToPrint({
    content: () => componentToPrint.current,
    documentTitle: "Imprimir tabla",
  });
  return (
    <>
      <div className="pb-2 pe-3 pe-lg-5">
        <Toolbar
          headersCSV={props.headersCSV}
          csvData={filteredLista}
          onFilter={onFilter}
          onPrint={printTable}
        />
      </div>
      <div ref={componentToPrint}>{props.render(filteredLista)}</div>
    </>
  );
}
