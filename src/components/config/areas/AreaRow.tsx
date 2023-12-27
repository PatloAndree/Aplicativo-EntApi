import React, { useCallback, useEffect, useState } from "react";
import { CameraAPIType } from "../../../api/cameras-api";
import InputSm from "../../common/forms/InputSm";

interface Props {
  area: CameraAPIType;
  onEdit: (a: CameraAPIType) => void;
  editLoading: boolean;
}

const cellClassName = "px-3 py-2";

export default function AreaRow(props: Props) {
  const [area, setArea] = useState<CameraAPIType | null>(null);

  useEffect(() => {
    setArea(props.area);
  }, [props.area]);

  const updateRow = useCallback(
    (key: string, value: string) => {
      if (!area) return;
      //Validation
      //const value = `${value}`;
      if (value.length > 50 || value.length === 0) return;
      setArea({ ...area, [key]: value });
    },
    [area]
  );

  if (!area) return null;
  return (
    <tr style={{ fontSize: "small" }} className="border-bottom">
      <td className={cellClassName}>{area.loc_nombre}</td>
      <td className={cellClassName}>
        <textarea
          className="form-control form-control-sm bg-light bg-opacity-10 text-opacity-75 text-dark "
          rows={1}
          style={{ width: "12rem" }}
          value={area.loc_descripcion}
          onChange={(e) => updateRow("loc_descripcion", e.target.value)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={area.loc_max_temp}
          onChange={(e) => updateRow("loc_max_temp", `${+e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={area.loc_min_temp}
          onChange={(e) => updateRow("loc_min_temp", `${+e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={area.loc_max_hume}
          onChange={(e) => updateRow("loc_max_hume", `${+e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={area.loc_min_hume}
          onChange={(e) => updateRow("loc_min_hume", `${+e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <select
          className="form-select form-select-sm bg-light bg-opacity-10 text-opacity-75 text-dark "
          style={{ width: "6.7rem" }}
          onChange={(e) => updateRow("loc_status", e.target.value)}
          value={area.loc_status}
        >
          <option value="activo">activo</option>
          <option value="inactivo">inactivo</option>
        </select>
      </td>
      <td className={cellClassName}>
        <select
          className="form-select form-select-sm bg-light bg-opacity-10 text-opacity-75 text-dark "
          style={{ width: "6.7rem" }}
          onChange={(e) => updateRow("loc_status", e.target.value)}
          value={area.loc_status}
        >
          <option value="activo">activo</option>
          <option value="inactivo">inactivo</option>
        </select>
      </td>
      <td className={cellClassName}>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => props.onEdit(area)}
          disabled={props.editLoading}
        >
          Guardar
        </button>
      </td>
    </tr>
  );
}
