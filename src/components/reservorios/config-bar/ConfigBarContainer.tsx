import React, { useCallback, useMemo, useState } from "react";
import { useAppStore } from "../../../store/store";
import ConfigBar from "./ConfigBar";

export default function ConfigBarContainer() {
  const [instalValue, setInstalValue] = useState({
    value: "",
    label: "Seleccionar",
  });

  const instalLabel = useMemo(
    () =>
      instalValue.value.length === 0 ? "Instalación 1" : instalValue.label,
    [instalValue]
  );

  const getReservorios = useAppStore((state) => state.getReservorios);

  const options = useMemo(
    () => [
      { value: "instal-1", label: "Instalación 1" },
      { value: "instal-2", label: "Instalación 2" },
      { value: "instal-3", label: "Instalación 3" },
    ],
    []
  );

  const onReload = useCallback(() => {
    getReservorios();
  }, [getReservorios]);

  /*Props: options: {value, label}[] instalValue instalLabel onSelect(value)  onReload*/
  return (
    <ConfigBar
      options={options}
      instalValue={instalValue}
      instalLabel={instalLabel}
      onSelect={setInstalValue}
      onReload={onReload}
    />
  );
}
