/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useCallback, FormEvent } from "react";
import { CameraAPIType } from "../../../api/cameras-api";
import InputSm from "../../common/forms/InputSm";

interface Props {
  area: CameraAPIType;
  onSave: (a: CameraAPIType) => void;
  saveLoading: boolean;
}
export default function AreaValues(props: Props) {
  const [area, setArea] = useState<CameraAPIType | null>(null);
  useEffect(() => setArea(props.area), [props.area]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!area) return;
      props.onSave(area);
    },
    [props.onSave, area]
  );

  const updateArea = useCallback(
    (key: string, value: string) => {
      if (!area) return;
      //Validation
      if (value.length > 50) return;
      setArea({ ...area, [key]: value });
    },
    [area]
  );

  if (!area) return null;
  return (
    <form onSubmit={onSubmit}>
      <div className="">Temperatura °C</div>
      <div className="text-secondary mt-2 d-flex gap-3 flex-wrap">
        <div className="d-flex align-items-baseline gap-2">
          <span>Máxima: </span>
          <InputSm
            value={area.loc_max_temp}
            onChange={(e) => updateArea("loc_max_temp", e.target.value)}
            required
          />
        </div>
        <div className="d-flex align-items-baseline gap-2">
          <span>Mínima: </span>
          <InputSm
            value={area.loc_min_temp}
            onChange={(e) => updateArea("loc_min_temp", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mt-3">Humedad %</div>
      <div className="text-secondary mt-2 d-flex align-items-baseline gap-3 flex-wrap">
        <div className="d-flex align-items-baseline gap-2">
          <span>Máxima: </span>
          <InputSm
            value={area.loc_max_hume}
            onChange={(e) => updateArea("loc_max_hume", e.target.value)}
            required
          />
        </div>
        <div className="d-flex align-items-baseline gap-2">
          <span>Mínima: </span>
          <InputSm
            value={area.loc_min_hume}
            onChange={(e) => updateArea("loc_min_hume", e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={props.saveLoading}
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
