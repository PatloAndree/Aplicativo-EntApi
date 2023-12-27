import React, {
  CSSProperties,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAreasAPI } from "../../api-state/useAreasAPI";
import { useAppStore } from "../../store/store";
import FieldControl from "../common/forms/FieldControl";
import { InputControl } from "../common/forms/InputControl";
import SelectInput, { SelectType } from "../common/forms/SelectInput";

export interface NewDispositivoType {
  name: string;
  id: string;
  area: string;
  maxTemp: string;
  minTemp: string;
  maxHume: string;
  minHume: string;
}

const inputStyle: CSSProperties = { width: "12rem" };

interface Props {
  onSave: (dis: NewDispositivoType) => any;
  saveLoading: boolean;
}
export default function NewDispositivo(props: Props) {
  const id = useAppStore((state) => state.user?.id);
  const { areaLista } = useAreasAPI(`${id}`);

  const options = useMemo(
    () => areaLista.map((a) => ({ value: `${a.loc_id}`, label: a.loc_nombre })),
    [areaLista]
  );
  const [selected, setSelected] = useState<SelectType | null>(null);

  const [dispositivoState, setDispositivoState] = useState<NewDispositivoType>({
    name: "",
    id: "",
    area: "",
    maxTemp: "",
    minTemp: "",
    maxHume: "",
    minHume: "",
  });
  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      //validation
      if (dispositivoState.area.length === 0) return;
      props.onSave(dispositivoState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onSave, dispositivoState]
  );
  useEffect(() => {
    if (!selected) return setDispositivoState((s) => ({ ...s, area: "" }));
    setDispositivoState((s) => ({ ...s, area: selected.value }));
  }, [selected]);

  return (
    <form onSubmit={onSubmit}>
      <div className="opacity-50">Datos del dispositivo</div>
      <div className="pt-3">
        <FieldControl
          label="Nombre"
          value={dispositivoState.name}
          setValue={(v) => setDispositivoState((s) => ({ ...s, name: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="ID"
          value={dispositivoState.id}
          setValue={(v) => setDispositivoState((s) => ({ ...s, id: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <InputControl
          label="Área"
          render={() => (
            <SelectInput
              selected={selected}
              options={options}
              onSelect={setSelected}
              style={inputStyle}
            />
          )}
        />
      </div>
      <div className="opacity-50 mt-4">Control</div>
      <div className="pt-3">
        <FieldControl
          label="Máx. Temperatura"
          ud="°C"
          type="number"
          value={dispositivoState.maxTemp}
          setValue={(v) => setDispositivoState((s) => ({ ...s, maxTemp: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Mín. Temperatura"
          ud="°C"
          type="number"
          value={dispositivoState.minTemp}
          setValue={(v) => setDispositivoState((s) => ({ ...s, minTemp: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Máx. Humedad"
          ud="%"
          type="number"
          value={dispositivoState.maxHume}
          setValue={(v) => setDispositivoState((s) => ({ ...s, maxHume: v }))}
          inputStyle={inputStyle}
        />
      </div>
      <div className="pt-3">
        <FieldControl
          label="Mín. Humedad"
          ud="%"
          type="number"
          value={dispositivoState.minHume}
          setValue={(v) => setDispositivoState((s) => ({ ...s, minHume: v }))}
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
