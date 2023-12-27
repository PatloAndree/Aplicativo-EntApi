import React, { CSSProperties, FormEvent, useCallback, useState } from "react";
import FieldControl, { AreaControl } from "../common/forms/FieldControl";

export interface NewAreaType {
  name: string;
  description: string;
  maxTemp: string;
  minTemp: string;
  maxHume: string;
  minHume: string;
}

const inputStyle: CSSProperties = {
  maxWidth: "12rem",
};

interface Props {
  onSave: (area: NewAreaType) => any;
  saveLoading: boolean;
}
export default function NewArea(props: Props) {
  const [areaState, setAreaState] = useState<NewAreaType>({
    name: "",
    description: "",
    maxTemp: "",
    minTemp: "",
    maxHume: "",
    minHume: "",
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //validation
      props.onSave(areaState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave, areaState]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="opacity-50">Datos</div>
      <div className="pt-3">
        <FieldControl
          label="Nombre"
          ud=""
          value={areaState.name}
          setValue={(v) => setAreaState((s) => ({ ...s, name: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <AreaControl
          label="Descripción"
          ud=""
          value={areaState.description}
          setValue={(v) => setAreaState((s) => ({ ...s, description: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="opacity-50 mt-4">Control</div>
      <div className="pt-3">
        <FieldControl
          label="Máx. Temperatura"
          ud="°C"
          type="number"
          value={areaState.maxTemp}
          setValue={(v) => setAreaState((s) => ({ ...s, maxTemp: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Mín. Temperatura"
          ud="°C"
          type="number"
          value={areaState.minTemp}
          setValue={(v) => setAreaState((s) => ({ ...s, minTemp: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Máx. Humedad"
          ud="%"
          type="number"
          value={areaState.maxHume}
          setValue={(v) => setAreaState((s) => ({ ...s, maxHume: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Mín. Humedad"
          ud="%"
          type="number"
          value={areaState.minHume}
          setValue={(v) => setAreaState((s) => ({ ...s, minHume: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-4 pb-2 d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
}
