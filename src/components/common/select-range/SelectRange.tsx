import { DatePicker } from "react-date-picker";
import React, { useCallback, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import "./select-range-component.scss";
import { SinceType } from "../../graficas/select/SelectRangeContainer";
import { RangeT } from "../../../store/AreaGraficaProvider";
import { moverFecha } from "../../../utilities/date-utils";

interface Props {
  timeRange: RangeT;
  sinceOptions: SinceType[];
  onFilter: (r: RangeT) => any;
}

export default function SelectRange(props: Props) {
  const [tempRange, setTempRange] = useState<RangeT>(null);
  useEffect(() => {
    // Calcula la fecha de inicio que sea 3 días antes de la fecha actual
    const fechaActual = new Date();
    const fechaInicio = moverFecha(fechaActual, -3);
    setTempRange([fechaInicio, fechaActual]);
  }, []);

  const [sinceSelected, setSinceSelected] = useState<SinceType>({
    value: 0,
    label: "Intervalo de ...",
  });

  const [validationError, setValidationError] = useState(false);
  const setStartDate = (startDate: any) => {
    if (!tempRange || !startDate) return;
    setValidationError(false);
    setTempRange([startDate, tempRange[1]]);
  };
  const setEndDate = (endDate: any) => {
    if (!tempRange || !endDate) return;
    setValidationError(false);
    setTempRange([tempRange[0], endDate]);
  };
  const selectSince = useCallback((v: SingleValue<SinceType>) => {
    if (!v) return;
    setSinceSelected(v);
    setTempRange([moverFecha(new Date(), -v.value), new Date()]);
    setValidationError(false);
  }, []);

  const onFilter = useCallback(() => {
    if (!tempRange) return;
    if (tempRange[0] > tempRange[1]) {
      setValidationError(true);
      return;
    }
    props.onFilter(tempRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempRange, props.onFilter]);

  if (!tempRange) return null;
  return (
    <div className="">
      <div className="d-flex align-items-center flex-wrap gap-3">
        <div className="d-flex align-items-center">
          <span className="opacity-75">Desde:</span>
          <DatePicker
            value={tempRange[0]}
            onChange={setStartDate}
            clearIcon={null}
            locale="es-ES"
            maxDate={new Date()}
            className="ms-2 text-dark text-opacity-50"
          />
        </div>
        <div className="d-flex align-items-center">
          <span className="opacity-75">Hasta:</span>
          <DatePicker
            value={tempRange[1]}
            onChange={setEndDate}
            clearIcon={null}
            locale="es-ES"
            maxDate={new Date()}
            className="ms-2 text-dark text-opacity-50"
          />
        </div>

        <Select
          options={props.sinceOptions}
          value={sinceSelected}
          onChange={selectSince}
          className="text-dark text-opacity-75 select-input"
          classNames={{
            option: (state) =>
              state.isSelected
                ? "bg-primary"
                : state.isFocused
                ? "bg-primary bg-opacity-25"
                : "",
          }}
        />
        <button className="ms-1 btn btn-primary text-white" onClick={onFilter}>
          Filtrar
        </button>
      </div>
      {validationError && (
        <div className="mt-3 alert alert-danger py-2">
          Ingrese un rango temporal válido
        </div>
      )}
    </div>
  );
}
