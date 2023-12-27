import React, { useMemo, useState, useEffect } from "react";
import { ReactComponent as GreenTop } from "../../../assets/gas_green.svg";
import { ReactComponent as YellowTop } from "../../../assets/gas_yellow.svg";
import { ReactComponent as RedTop } from "../../../assets/gas_red.svg";
import { useBalonApi } from "../../../api-state/useBalonApi";
import Logo from "../../../assets/gas_container.svg";
import AxiosApi from "../Axios/AxiosApi";
import axios from 'axios';
import {UserAPIType} from '../../../api/auth-api';
import { getLocal } from '../../../services/local-storage';
import { API2 } from "../../../api/api2";

interface Dispositivo {
  codigo: number;
  nombre: string;
  bateria: number;
  porcentaje: number;
  capacidad: number;
  valorminimo: number;
  valorreferencia: number;
  calidad: number;
  fecha: string;
}

interface Locacion {
  locacion: string;
  dispositivos: Dispositivo[];
}

interface ApiResponse {
  total: number;
  locaciones: Locacion[];
}

const API_URL = `${API2}/consultarmedidoreslocacion`;

interface Props {
  width: number;
  height: number;
  filled: number;
  nivel: number;
  volumen: number;
  inRange: boolean;
}
export default function BalonDiagram(props: Props) {

  const user = getLocal<UserAPIType>("user");

  const [lowLevel] = [0];
  const [calidadValue, setCalidadValue] = useState<number | null>(null);
  const [cantidadValue, setCantidaddValue] = useState<number | null>(null);
  const [capacidadValue, setCapacidadValue] = useState<number | null>(null);
  const [nombreValue, setNombreValue] = useState<string | null>(null);
  const [fechaValue, setFechaValue] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                API_URL,
                { empresa: 1 },
                {
                  headers: {
                    Authorization: `Bearer ${user?.accessToken}`,
                  },
                }
            );
            if (response.data.locaciones.length > 0) {
                const dispositivos = response.data.locaciones[0].dispositivos;
                if (dispositivos.length > 0) {
                  setCalidadValue(dispositivos[0].calidad);
                  setCantidaddValue(dispositivos[0].porcentaje);
                  setCapacidadValue(dispositivos[0].capacidad);
                  setNombreValue(dispositivos[0].nombre);
                  setFechaValue(dispositivos[0].fecha);

                }
              }
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };
  
      fetchData();
  }, []);

  const bgGreen = "#20B026"; //53B96A
  const bgYellow = "#FFC107";
  const bgRed = "#FA4646";
  const calidad = calidadValue !== null ? calidadValue : 0;
  const cantidad  = cantidadValue !== null ? cantidadValue : 0;
  const capacidad  = capacidadValue !== null ? capacidadValue : 0; 
  const nombreBalon  = nombreValue !== null ? nombreValue : '-'; 


  const filled = useMemo(() => {
    if (props.filled < 0) return 0;
    if (props.filled > 1) return 1;
    return props.filled;
  }, [props.filled]);

  const tankHeight = props.height;
  const tankWidth = props.width;
  const waterHeight = lowLevel + filled * (tankHeight - lowLevel - 5);

  if (cantidad > 70) {
    var waterOffset = 42;
    var colorLetra = "#28A745"; //53B96A
  }else if(cantidad > 50){
    waterOffset = 70;
    colorLetra = "#FFC107"
}
  else if(cantidad > 30){
      waterOffset = 80;
      colorLetra = "#FFC107"
  }else{
    waterOffset = 90;
     colorLetra = "#FA4646";
  }

  return (
    <div className="position-absolute text-end">
   
      {/* <span style={{fontSize:13}} className="text-left"> {nombreBalon}</span> */}
      <div className="">  
        <img src={Logo} alt="Logo" width={80} height={160}  className="position-absolute"/>
        <svg width={props.width} height={props.height}>
          <g>
            <svg
              x={0}
              y={tankHeight - waterHeight}
              height={waterHeight}
              width={tankWidth}
            >
              <rect
                fill={cantidad >= 50  ?  bgGreen : cantidad > 21 ? bgYellow : bgRed}
                height={waterHeight - waterOffset}
                width={"80%"}
                x={0}
                y={waterOffset}
                rx={10} 
                ry={15}
              />
              <animate
                attributeName="y"
                values={`${tankHeight};${tankHeight - waterHeight}`}
                dur="2s"
              />
              <animate
                attributeName="height"
                values={`${0};${waterHeight}`}
                dur="2s"
              />
            </svg>
              <text x="40%" y="80%" dominantBaseline="middle" textAnchor="middle" fill="white" className="" style={{zIndex:2, fontSize:15}}>
                {cantidad} Cm
              </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 text-center">
        <div className="text-dark opacity-75" style={{fontSize:14}}>Capacidad {capacidad}Kg</div>
        <div>
        
        </div>
      </div>

      <div className="mt-1 text-center">
        <div className="text-secondary" style={{fontSize:12}}>Actualizado hace:  <br /> 
        {fechaValue}</div>   <br />  
      </div>

    </div>
  );
}
