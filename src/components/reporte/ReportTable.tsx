import { useMemo } from "react";
import { ReporteRowType } from "../../api-state/useReporteAPI";
import MUITable from "../common/table/MUITable";

interface Props {
  headers: ReporteRowType;
  dataReporte: ReporteRowType[];
}

export default function ReportTable(props: Props) {
  const reporteColumns = useMemo(() => {
    return Object.keys(props.headers).map((k) => ({
      name: k,
      label: props.headers[k],
    }));
  }, [props.headers]);

  return (
    <MUITable title="" columns={reporteColumns} data={props.dataReporte} />
  );
}
