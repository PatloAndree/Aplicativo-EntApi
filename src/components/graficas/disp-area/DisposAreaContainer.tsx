import React, { useMemo } from "react";
import { useDispAreaAPI } from "../../../api-state/useDispAreaAPI";
import { useAreaGraficaContext } from "../../../store/AreaGraficaProvider";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import DisposArea from "./DisposArea";
import DisposProm from "./DisposProm";

export default function DisposAreaContainer() {
  const { currentArea } = useAreaGraficaContext();
  const { dispositivos, isLoading, error } = useDispAreaAPI(currentArea?.id);

  const tempProm = useMemo(() => {
    if (!dispositivos) return 0;
    return (
      dispositivos.reduce<number>((temp, dev) => temp + dev.temp, 0) /
      dispositivos.length
    );
  }, [dispositivos]);

  const humeProm = useMemo(() => {
    if (!dispositivos) return 0;
    return (
      dispositivos.reduce<number>((hume, dev) => hume + dev.hum, 0) /
      dispositivos.length
    );
  }, [dispositivos]);

  if (isLoading || !dispositivos) return <Loading className="my-5" />;
  if (error)
    return <ErrorMessage className="my-5" message="Error al cargar datos." />;
  return (
    <div>
      <div>
        <DisposArea dispos={dispositivos} />
      </div>
      <div className="pt-5">
        <DisposProm tempProm={tempProm} humeProm={humeProm} />
      </div>
    </div>
  );
}
