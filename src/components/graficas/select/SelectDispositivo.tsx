import React from "react";
import Select, { SingleValue } from "react-select";

export interface SelectType2 {
  value: number;
  label: string;
}

interface Props {
  selected2: SelectType2 | null;
  options2: SelectType2[];
  onSelect: (v: SingleValue<SelectType2>) => any;
}


export default function SelectArea(props: Props) {
  return (
    <div className="d-flex align-items-center gap-3">
    
       <div className="opacity-75">Dispositivos: </div>
      <Select
        // options={[
        //   { value: -1, label: "TODOS" },
        //   ...props.options,]}
        // value={{ value: -1, label: "TODOS" }}
        options={props.options2}
        value={props.selected2 }
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
