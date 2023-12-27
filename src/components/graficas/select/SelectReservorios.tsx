import React from "react";
import Select, { SingleValue } from "react-select";

export interface SelectTypeRes {
  value: number;
  label: string;
}

interface Props {
  selected3: SelectTypeRes | null;
  options3: SelectTypeRes[];
  onSelect: (v: SingleValue<SelectTypeRes>) => any;
}

export default function SelectReservorios(props: Props) {
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="opacity-75">Reservorio: </div>
      <Select
        options={props.options3}
        value={props.selected3 }
        onChange={props.onSelect}
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
      
    </div>
  );
}
