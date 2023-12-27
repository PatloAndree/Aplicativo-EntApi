import React, { useEffect, useMemo, useState } from "react";
import { LevelDatumType } from "../../../store/res-graficas-store";
import CardWidget from "../../common/card-widget/CardWidget";
import GraficoLeyendaComponent from "../../common/grafica/GraficoLeyendaComponent";
import { useAppStore } from "../../../store/store";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import { AccessorsType } from "../../common/grafica/GraficaTemporal";
import SelectReservorio from "../../graficas/select/SelectReservorio";


export default function NivelGraficaContainer() {
  const timeRange = useAppStore((state) => state.resTimeRange);
  const series = useAppStore((state) => state.resGraficas);
  const loading = useAppStore((state) => state.getGraficasLoading);
  const error = useAppStore((state) => state.getGraficasError);

  // aca se cambia lo que se ve en el grafico
  const accesors: AccessorsType<LevelDatumType> = {
    xAccessor: (d: LevelDatumType) => d?.fecha,
    yAccessor: (d: LevelDatumType) => d?.nivel,
  };


  if (loading) return <Loading className="my-5" />;
  if (error) return <ErrorMessage message="Error al cargar gráfica." />;
  if (!timeRange) return null;
  return (
    <CardWidget title="Evolución temporal" toolbar={true}>
      <div className="p-4 pb-5">
        <SelectReservorio />
        <div className="mt-3" style={{ width: "100%" }}>
          <GraficoLeyendaComponent<LevelDatumType>
            title="Altura (Cm)"
            timeDomain={timeRange}
            series={series}
            unidad="m"
            accessors={accesors}

          />
        </div>
        <div className="mt-3">
          {/* <GraficoLeyendaComponent<LevelDatumType>
            title="Volumen (m³)"
            timeDomain={timeRange}
            series={series}
            unidad="m"
            accessors={accesors}
          /> */}
        </div>
      </div>
    </CardWidget>
  );
}
