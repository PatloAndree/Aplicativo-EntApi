import { useMemo } from "react";
import { ReporteResRowType } from "../../api-state/useReporteResApi";
import MUITable from "../common/table/MUITable";

interface Props {
  headers: ReporteResRowType;
  dataReporte: ReporteResRowType[];
}

export default function ReportTableRes(props: Props) {
  const reporteColumns = useMemo(() => {
    return Object.keys(props.headers).map((k) => ({
      name: k,
      label: props.headers[k],
    }));
  }, [props.headers]);

  return (
    <MUITable title="Reporte de reservorios" columns={reporteColumns} data={props.dataReporte} />
    // <div>
    //   hola soy la data
    // </div>
  );
}
