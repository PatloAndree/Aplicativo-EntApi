import React, { useEffect, useMemo, useState } from "react";
import { useAreasAPI } from "../../../api-state/useAreasAPI";
import { useAreaGraficaContext } from "../../../store/AreaGraficaProvider";
import { useAppStore } from "../../../store/store";
import SelectArea, { SelectType } from "./SelectArea";
import SelectDispositivo,  { SelectType2} from "./SelectDispositivo";
import {UserAPIType} from '../../../api/auth-api';
import { getLocal } from '../../../services/local-storage';
import axios from "axios";


export interface DispositivoAPIType {
  dis_id: number;
  dis_mas: number;
  dis_loc: string;
  dis_sensor_id: number;
  dis_nom: string;
  dis_maxt: string;
  dis_mint: string;
  dis_maxh: string;
  dis_minh: string;
  dis_status: string;
  dis_last_up: string;
  loc_nom: string;
  temp: number;
  hum: number;
  bat: number;
}

export interface DispositivosDataType {
  status: boolean;
  totalRegistros: number;
  listaDatos: DispositivoAPIType[];
  mensaje: string;
}

export default function SelectReservorioContainer() {

  
  const user = getLocal<UserAPIType>("user");

  const id = useAppStore((state) => state.user?.id);
  const { setCurrentArea } = useAreaGraficaContext();
  const { areaLista } = useAreasAPI(`${id}`);

  const [dispositivoLista, setDispositivoLista] = useState<DispositivoAPIType[]>([]);
  const [selected, setSelected] = useState<SelectType | null>(null);

  const [selected2, setSelected2] = useState<SelectType2 | null>(null);

  const [IdLocacion, setLocacion] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string | null>(null);


  const options = useMemo<SelectType[]>(() => {
    return areaLista.map((a) => ({ value: a.loc_id, label: a.loc_nombre }));

  }, [areaLista]);

  const options2 = useMemo<SelectType2[]>(() => {
    const todosOption: SelectType2 = { value: 0, label: "TODOS" };
    const listaOptions = dispositivoLista.map((b) => ({ value: b.dis_sensor_id, label: b.dis_nom }));
    return [todosOption, ...listaOptions];
  }, [dispositivoLista]);


  useEffect(() => {

    const codigo = selected?.value;
    const tipo = 0;
  
    const apiUrl = `https://entel-iot.pe/API_ENTEL/api/Consultas/dispositivoslista?codigo=${codigo}&tipo=${tipo}`;
  
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la información");
        }
        return response.json();
      })
      .then((data: DispositivosDataType) => {
        setDispositivoLista(data.listaDatos);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
      });

    if (!selected ) return;
    setLocacion(`${selected.value}`);
    setNombre(`${selected.label}`);
    var locacionId = selected.value;
    setCurrentArea({ id: `${selected.value}`, name: selected.label , locacion:`${locacionId}`});
    console.log("AREAS");
  }, [selected, setCurrentArea]);


  useEffect(() => {
    if (!selected2 ) return;
    setCurrentArea({ id: `${selected2.value}`, name:`${nombre}` , locacion:`${IdLocacion}` });
  }, [selected2, setCurrentArea]);


  useEffect(() => {
    if (options.length === 0) return;
    setSelected(options[0]);
  }, [options]);

  useEffect(() => {
    if (options2.length === 0) return;
    setSelected2(options2[0]);
  }, [options2]);

  return (
    <div className="row">
      <div className="col">
        <SelectArea selected={selected} options={options} onSelect={setSelected} />
      </div>
      {
        user?.username == 'Altamarfoods_Admin' ?
        <div className="col">
          <SelectDispositivo selected2={selected2} options2={options2} onSelect={setSelected2} />
        </div>
        :
        ""
      }
    
    </div>
  );
}
