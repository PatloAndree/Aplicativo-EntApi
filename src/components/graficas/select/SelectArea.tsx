import React from "react";
import Select, { SingleValue } from "react-select";

export interface SelectType {
  value: number;
  label: string;
}


interface Props {
  selected: SelectType | null;
  options: SelectType[];
  onSelect: (v: SingleValue<SelectType>) => any;
}

export default function SelectArea(props: Props) {
  return (
    <div className="d-flex align-items-center gap-3">
      <div className="opacity-75">Área: </div>
      <Select
        options={props.options}
        value={props.selected }
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
