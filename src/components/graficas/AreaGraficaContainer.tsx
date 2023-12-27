import React, { useEffect, useMemo, useState } from "react";
import {
  AreaDatumT,
  AreaGraficaType,
  useAreaGraficaAPI,
} from "../../api-state/useAreaGraficaAPI";
import { RangeT, useAreaGraficaContext } from "../../store/AreaGraficaProvider";
import { useAppStore } from "../../store/store";
import { moverFecha } from "../../utilities/date-utils";
import { AccessorsType } from "../common/grafica/GraficaTemporal";
import GraficoLeyendaComponent from "../common/grafica/GraficoLeyendaComponent";
import Loading from "../common/loading/Loading";
import ErrorMessage from "../common/message/ErrorMessage";

export default function AreaGraficaContainer() {
  const id = useAppStore((state) => state.user?.id);
  const { timeRange, currentArea } = useAreaGraficaContext();
  const [maxTimeRange, setMaxTimeRange] = useState<RangeT>(null);
  const { graficaVis, error, isLoading } = useAreaGraficaAPI(
    `${id}`,
    currentArea?.id || "",
    maxTimeRange
  );
  useEffect(() => {
    if (!maxTimeRange || !timeRange) return setMaxTimeRange(timeRange);
    if (maxTimeRange[1] < timeRange[1] || maxTimeRange[0] > timeRange[0])
      setMaxTimeRange(timeRange);
  }, [timeRange, maxTimeRange]);

  const graficaFiltered = useMemo<AreaGraficaType[]>(() => {
    if (!timeRange) return [];
    return graficaVis.map((g) => ({
      ...g,
      trama: g.trama.filter((d, i) => {
        const isInRange = d.fecha > timeRange[0] && d.fecha < timeRange[1];
        const pickMultiple =
          i % (moverFecha(timeRange[0], 14) > timeRange[1] ? 6 : 12) === 0;
        return isInRange && pickMultiple;
      }),
    }));
  }, [timeRange, graficaVis]);

  const tempAccesors = useMemo<AccessorsType<AreaDatumT>>(
    () => ({
      xAccessor: (d: AreaDatumT) => d?.fecha,
      yAccessor: (d: AreaDatumT) => +d?.temp.toFixed(2),
    }),
    []
  );
  const humeAccessors = useMemo<AccessorsType<AreaDatumT>>(
    () => ({
      xAccessor: (d: AreaDatumT) => d?.fecha,
      yAccessor: (d: AreaDatumT) => +d?.hume.toFixed(2),
    }),
    []
  );

  if (isLoading || !timeRange) return <Loading className="my-5" />;
  if (error) return <ErrorMessage message="Error al cargar gráficas" />;
  return (
    <div>
      <div className="text-secondary">Temperatura (°C)</div>
      <div
        style={{ overflowX: "auto", whiteSpace: "nowrap", maxWidth: "80vw" }}
      >
        <div className="my-2" style={{ minWidth: 600 }}>
          <GraficoLeyendaComponent<AreaDatumT>
            timeDomain={timeRange}
            series={graficaFiltered}
            unidad="°C"
            accessors={tempAccesors}
          />
        </div>
      </div>

      <div className="text-secondary pt-4">Humedad (%)</div>
      <div
        style={{ overflowX: "auto", whiteSpace: "nowrap", maxWidth: "80vw" }}
      >
        <div className="my-2" style={{ minWidth: 600 }}>
          <GraficoLeyendaComponent<AreaDatumT>
            timeDomain={timeRange}
            series={graficaFiltered}
            unidad="%"
            accessors={humeAccessors}
          />
        </div>
      </div>
    </div>
  );
}
