import React, { useEffect, useMemo, useState } from "react";
import { useAreasAPI } from "../../../api-state/useAreasAPI";
import { useAreaGraficaContext } from "../../../store/AreaGraficaProvider";
import { useAppStore } from "../../../store/store";
import SelectArea, { SelectType } from "./SelectArea";
import SelectReservorios, { SelectTypeRes} from "./SelectReservorios";
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

interface DatumAPIType {
  report_fechahora:string;
  report_locacion:string;
  report_dispositivo:string;
  report_longitud:string;
  report_volumen:string;
  report_estado:string;
  report_signal:string;
  [key: string]: string;
}

interface HeaderType {
    locacion_codigo: string;
    locacion_nombre: string;
    dispositivo_imei: number;
}

export interface GraficasResType {
  status: boolean;
  mensaje: string;
  totalRegistros: number;
  headers: HeaderType[];
  data: DatumAPIType[];
}

export default function SelectDispositivoContainer() {

  const user = getLocal<UserAPIType>("user");
  const [data, setData] = useState(null);

  const id = useAppStore((state) => state.user?.id);
  const { setCurrentArea } = useAreaGraficaContext();
  const { areaLista } = useAreasAPI(`${id}`);

  const [dispositivoLista, setDispositivoLista] = useState<DispositivoAPIType[]>([]);
  const [resLista, setResLista] = useState<HeaderType[]>([]);

  const [selected, setSelected] = useState<SelectType | null>(null);
  const [selected2, setSelected2] = useState<SelectType2 | null>(null);
  const [selected3, setSelectedRes] = useState<SelectTypeRes | null>(null);

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

  const options3 = useMemo<SelectTypeRes[]>(() => {
  //  const todosOption: SelectTypeRes = { value: 0, label: "TODOS" };
   const listaOptions = resLista.map((b) => ({ value: b.dispositivo_imei, label: b.locacion_nombre }));
   return [ ...listaOptions];
  }, [resLista]);


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
  }, [selected, setCurrentArea]);


  useEffect(() => {
    if (!selected2 ) return;
    setCurrentArea({ id: `${selected2.value}`, name:`${nombre}` , locacion:`${IdLocacion}`  });
  }, [selected2, setCurrentArea]);

  useEffect(() => {
    if (!selected3 ) return;
    setCurrentArea({ id: `${selected3.value}`, name:`${selected3.label}` , locacion:`${IdLocacion}`  });
    console.log("hols oy selecccion Reservorio");
    console.log(selected3.label);
  }, [selected3, setCurrentArea]);


  useEffect(() => {
    if (options.length === 0) return;
    setSelected(options[0]);
  }, [options]);

  useEffect(() => {
    if (options2.length === 0) return;
    setSelected2(options2[0]);
  }, [options2]);

    useEffect(() => {
      if (options3.length === 0) return;
      setSelectedRes(options3[0]);
    }, [options3]);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://entel-iot.pe/API_ENTEL/api/Consultas/listarReporteReservoriosGas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            indice: '8',
            tipo: 'reservorio',
            fecha_inicio: '2023-10-01 00:00:00',
            fecha_fin: '2023-10-02 00:00:00',
            cantidad: 100000,
          }),
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const result = await response.json();
        setResLista(result.headers);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []); // El segundo argumento vacío [] asegura que el efecto solo se ejecute una vez (como componentDidMount)


  return (
    <div className="row">
      <div className="col">
      {
        user?.id == 8 ?
        <SelectReservorios selected3={selected3} options3={options3} onSelect={setSelectedRes} />
        :
        <SelectArea selected={selected} options={options} onSelect={setSelected} />
      }
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
