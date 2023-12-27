import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import { extendRange } from "../utilities/date-utils";

export type RangeT = [Date, Date] | null;
interface AreaT {
  id: string;
  name: string;
  locacion:string
}
interface AreaGraficaContextT {
  timeRange: RangeT;
  currentArea: AreaT | null;
  updateTimeRange: (r: RangeT) => void;
  setCurrentArea: Dispatch<SetStateAction<AreaT | null>>;
}

const AreaGraficaContext = createContext<AreaGraficaContextT>(null!);

export const useAreaGraficaContext = () => useContext(AreaGraficaContext);

interface Props {
  children: ReactNode;
}
export default function AreaGraficaProvider({ children }: Props) {
  const [timeRange, setTimeRange] = useState<RangeT>(null);
  const [currentArea, setCurrentArea] = useState<AreaT | null>(null);

  const updateTimeRange = useCallback((r: RangeT) => {
    if (!r) return;
    setTimeRange(extendRange(r));
  }, []);

  return (
    <AreaGraficaContext.Provider
      value={{
        timeRange,
        updateTimeRange,
        currentArea,
        setCurrentArea,
      }}
    >
      {children}
    </AreaGraficaContext.Provider>
  );
}
