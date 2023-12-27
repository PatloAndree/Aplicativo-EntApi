import React, { CSSProperties } from "react";
import Select, { SingleValue } from "react-select";

export interface SelectType {
  value: string;
  label: string;
}

interface Props {
  selected: SelectType | null;
  options: SelectType[];
  onSelect: (v: SingleValue<SelectType>) => any;
  style?: CSSProperties;
  className?: string;
}
export default function SelectInput(props: Props) {
  return (
    <span style={props.style}>
      <Select
        options={props.options}
        value={props.selected}
        onChange={props.onSelect}
        className={`text-dark text-opacity-75 ${props.className}`}
        classNames={{
          option: (state) =>
            state.isSelected
              ? "bg-primary"
              : state.isFocused
              ? "bg-primary bg-opacity-25"
              : "",
          control: () => "bg-light bg-opacity-10",
        }}
      />
    </span>
  );
}
