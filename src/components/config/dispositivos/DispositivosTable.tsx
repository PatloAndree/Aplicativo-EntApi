import { MUIDataTableProps } from "mui-datatables";
import { useMemo } from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import MUITable from "../../common/table/MUITable";
import DispositivoRow from "./DispositivoRow";
interface Props {
  dispositivoLista: DispositivoAPIType[];
  onEdit: (d: DispositivoAPIType) => void;
  editLoading: boolean;
}
export default function DispositivosTable(props: Props) {
  const columns: MUIDataTableProps["columns"] = useMemo(
    () => [
      { name: "dis_nom", label: "Nombre / ID" },
      { name: "loc_nom", label: "Área" },
      { name: "dis_maxt", label: "Temp. Máx. (°C)" },
      { name: "dis_mint", label: "Temp. Mín. (°C)" },
      { name: "dis_maxh", label: "Hume. Máx. (%)" },
      { name: "dis_minh", label: "Hume. Mín. (%)" },
      { name: "dis_status", label: "Status" },
      { name: "dis_status", label: "Batería" },
      { name: "dis_nom", label: "Acción" },
    ],
    []
  );

  const options: MUIDataTableProps["options"] = useMemo(
    () => ({
      customRowRender: (data, i, j) => {
        return (
          <DispositivoRow
            dispositivo={props.dispositivoLista[j]}
            onEdit={props.onEdit}
            editLoading={props.editLoading}
          />
        );
      },
      viewColumns: false,
    }),
    [props]
  );

  return (
    <ResponsiveContainer>
      <MUITable
        title=""
        columns={columns}
        data={props.dispositivoLista}
        options={options}
      />
    </ResponsiveContainer>
  );
}
