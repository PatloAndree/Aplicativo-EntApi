import React, { useCallback, useEffect, useState } from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import InputSm from "../../common/forms/InputSm";

const cellClassName = "px-3 py-2";
interface Props {
  dispositivo: DispositivoAPIType;
  onEdit: (d: DispositivoAPIType) => void;
  editLoading: boolean;
}
export default function DispositivoRow(props: Props) {
  const [dispositivo, setDispositivo] = useState<DispositivoAPIType | null>(
    null
  );

  useEffect(() => {
    setDispositivo(props.dispositivo);
  }, [props.dispositivo]);

  const updateRow = useCallback(
    (key: string, value: string) => {
      if (!dispositivo) return;
      //Validation
      //const value = `${value}`;
      if (value.length > 50 || value.length === 0) return;
      setDispositivo({ ...dispositivo, [key]: value });
    },
    [dispositivo]
  );

  if (!dispositivo) return null;
  return (
    <tr style={{ fontSize: "small" }} className="border-bottom">
      <td className={cellClassName}>{dispositivo.dis_nom}</td>
      <td className={cellClassName}>{dispositivo.loc_nom}</td>
      <td className={cellClassName}>
        <InputSm
          value={dispositivo.dis_maxt}
          onChange={(e) => updateRow("dis_maxt", `${e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={dispositivo.dis_mint}
          onChange={(e) => updateRow("dis_mint", `${e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={dispositivo.dis_maxh}
          onChange={(e) => updateRow("dis_maxh", `${e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <InputSm
          value={dispositivo.dis_minh}
          onChange={(e) => updateRow("dis_minh", `${e.target.value}`)}
          required
        />
      </td>
      <td className={cellClassName}>
        <select
          className="form-select form-select-sm bg-light bg-opacity-10 text-opacity-75 text-dark "
          style={{ width: "6.7rem" }}
          onChange={(e) => updateRow("dis_status", `${e.target.value}`)}
          value={dispositivo.dis_status}
        >
          <option value="activo">activo</option>
          <option value="inactivo">inactivo</option>
        </select>
      </td>
      <td className={cellClassName}>
        <select
          className="form-select form-select-sm bg-light bg-opacity-10 text-opacity-75 text-dark"
          style={{ width: "6.7rem" }}
          onChange={(e) => updateRow("dis_status", `${e.target.value}`)}
          value={dispositivo.dis_status}
        >
          <option value="activo">activo</option>
          <option value="inactivo">inactivo</option>
        </select>
      </td>
      <td className={cellClassName}>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => props.onEdit(dispositivo)}
          disabled={props.editLoading}
        >
          Guardar
        </button>
      </td>
    </tr>
  );
}
