import React, { useCallback, useEffect } from "react";
import {
  RangeT,
  useAreaGraficaContext,
} from "../../../store/AreaGraficaProvider";
import { moverFecha } from "../../../utilities/date-utils";
import SelectRange from "../../common/select-range/SelectRange";

export type SinceType = { value: number; label: string };
const sinceOptions: SinceType[] = [
  { value: 3, label: "3 días" },
  { value: 7, label: "7 días" },
  { value: 14, label: "14 días" },
  { value: 30, label: "30 días" },
  { value: 60, label: "60 días" },
];

export default function SelectRangeContainer() {
  const { timeRange, updateTimeRange } = useAreaGraficaContext();

  useEffect(() => {
    updateTimeRange([moverFecha(new Date(), -4), new Date()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFilter = useCallback(
    (range: RangeT) => {
      updateTimeRange(range);
    },
    [updateTimeRange]
  );

  return (
    <SelectRange
      timeRange={timeRange}
      sinceOptions={sinceOptions}
      onFilter={onFilter}
    />
  );
}
