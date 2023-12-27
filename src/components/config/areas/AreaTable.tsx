import { MUIDataTableProps } from "mui-datatables";
import React, { useMemo } from "react";
import { CameraAPIType } from "../../../api/cameras-api";
import ResponsiveContainer from "../../common/ResponsiveContainer";
import MUITable from "../../common/table/MUITable";
import AreaRow from "./AreaRow";

interface Props {
  areaLista: CameraAPIType[];
  onEdit: (a: CameraAPIType) => void;
  editLoading: boolean;
}
export default function AreaTable(props: Props) {
  const columns: MUIDataTableProps["columns"] = useMemo(
    () => [
      { name: "loc_nombre", label: "Nombre" },
      { name: "loc_descripcion", label: "Descripción" },
      { name: "loc_max_temp", label: "Temp. Máx. (°C)" },
      { name: "loc_min_temp", label: "Temp. Mín. (°C)" },
      { name: "loc_max_hume", label: "Hume. Máx. (°C)" },
      { name: "loc_min_hume", label: "Hume. Mín. (°C)" },
      { name: "loc_status", label: "Status" },
      { name: "loc_status", label: "Conexión gateway" },
      { name: "", label: "Acción" },
    ],
    []
  );

  const options: MUIDataTableProps["options"] = useMemo(
    () => ({
      customRowRender: (data, i, j) => {
        return (
          <AreaRow
            area={props.areaLista[j]}
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
        data={props.areaLista}
        options={options}
      />
    </ResponsiveContainer>
  );
}
