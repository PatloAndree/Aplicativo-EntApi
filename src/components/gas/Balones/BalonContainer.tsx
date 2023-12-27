import React, { useState,useEffect, useRef } from 'react';
import { useAppStore } from "../../../store/store";
import CardWidget from "../../common/card-widget/CardWidget";
import BalonDiagram from './BalonDiagram';
import GraficoBarra from '../GraficoBarra/GraficoBarra';
import axios from 'axios';
import {UserAPIType} from '../../../api/auth-api';
import { getLocal } from '../../../services/local-storage';
import Select, { SingleValue } from "react-select";
import Tarjeta from '../../common/tarjeta/Tarjeta';
import BtnIcon from '../../common/btn-icon/BtnIcon';
import { GoDash as Dash, GoPlus as Plus, GoSync } from "react-icons/go";
import { API2 } from '../../../api/api2';


  interface Dispositivo {
        codigo: number;
        nombre: string;
        bateria: number;
        porcentaje: number;
        capacidad: number;
        valorminimo: number;
        valorreferencia: number;
        calidad: number;
  }
  
  interface Locacion {
    locacion: string;
    dispositivos: Dispositivo[];
  }
  
  interface ApiResponse {
    total: number;
    locaciones: Locacion[];
  }

const API_URL = `${API2}/consultarmedidoreslocacion/`;

export default function BalonContainer() {

    const user = getLocal<UserAPIType>("user");
    const [selectedValue, setSelectedValue] = useState('');
    const [lowLevel] = [0];
    const [calidadValue, setCalidadValue] = useState<number | null>(null);
    const [cantidadValue, setCantidaddValue] = useState<number | null>(null);
    const [capacidadValue, setCapacidadValue] = useState<number | null>(null);
    const [bateriaValue, setBateriaValue] = useState<number | null>(null);
    const [valorMaximo, setValorMaximo] = useState<number>(0);
    const [valorMinimo, setValorMinimo] = useState(0);

    const [ValorReferencia, setValorReferencia] = useState<number | null>(null);
    const [nombreValue, setNombreValue] = useState<string | null>(null);

    const PonerAlerta = () => {
        alert(`Máximo: ${valorMaximo}, Mínimo: ${valorMinimo}`);
    };

    const [reloadKey, setReloadKey] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async () => {
        setIsLoading(true);
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
                  setBateriaValue(dispositivos[0].bateria);
                  setValorMinimo(dispositivos[0].valorminimo);
                  setValorMaximo(dispositivos[0].valorreferencia);
                  setNombreValue(dispositivos[0].nombre);
                }
              }
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
        setIsLoading(false); 
    };

    const recargar = () => {
        setReloadKey(prevKey => prevKey + 1);
        fetchData();
     };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
        recargar();
        console.log("cada 60 segundos");
        }, 60000); //cada 60 segundos
    
        return () => {
        clearInterval(intervalId); 
        };
    
    }, [reloadKey]);

      const calidad = calidadValue !== null ? calidadValue : 0;
      const bateria  = bateriaValue !== null ? bateriaValue : 0;
      const señal  = cantidadValue !== null ? cantidadValue: 0; 
      const titleConstant = "Balón";

      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        setSelectedValue(selectedType);
        handleTypeSelect(selectedType);
      };

      const handleTypeSelect = (selectedType: string) => {
        console.log('Tipo seleccionado:', selectedType);
      };

    return (
        <div>
        <Tarjeta title={`${titleConstant} ${nombreValue} `} toolbar={true}>

            <div className="container overflow-hidden">
                <div className="row d-flex justify-content-center d-none">
                    <div className="col-md-1">
                    <BtnIcon
                        onClick={recargar}
                        className="text-black"
                        >
                        <GoSync />
                    </BtnIcon>
                    </div>
                
                </div>
            </div>
            {!isLoading && 
                <div className="container overflow-hidden">
                    
                    <div className="row gy-2 gx-5">
                            <div className="col-7 col-md-6 col-xl-3 pt-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {/* <div className="d-flex justify-content-center flex-wrap" > */}
                                    <div className="col-12 border border-2 rounded">
                                        <div className="form-group row text-end p-1">
                                            <div className="col-6 col-md-6 col-sm-6 ">
                                                <div className='opacity-75' style={{fontSize:13}}>Calidad:</div>
                                            </div>

                                            <div className="col-6 col-md-6 col-sm-4 text-start">
                                                {
                                                calidad <= 0 ?
                                                    <div className="col-12 col-md-6  col-sm-6 ">
                                                        <i className="bi bi-star"  style={{color:'#9DB2BF'}} ></i>
                                                        <i className="bi bi-star" style={{color:'#9DB2BF'}}></i>
                                                        <i className="bi bi-star" style={{color:'#9DB2BF'}}></i>
                                                    </div>
                                                :
                                                calidad == 1 
                                                ?
                                                    <div className="col-12 col-md-6  col-sm-6 ">
                                                        <i className="bi bi-star-fill"  style={{color:'#53B96A'}} ></i>
                                                        <i className="bi bi-star" style={{color:'#9DB2BF'}}></i>
                                                        <i className="bi bi-star" style={{color:'#9DB2BF'}}></i>
                                                    </div>
                                                
                                                :  calidad == 2 ?
                                                    <div className="col-12 col-md-6  col-sm-6 ">
                                                        <i className="bi bi-star-fill" style={{color:'#53B96A'}} ></i>
                                                        <i className="bi bi-star-fill" style={{color:'#53B96A'}} ></i>
                                                        <i className="bi bi-star" style={{color:'#9DB2BF'}} ></i>
                                                    </div>
                                                :
                                                    <div className="col-12 col-md-6  col-sm-6 ">
                                                        <i className="bi bi-star-fill" style={{color:'#53B96A'}} ></i>
                                                        <i className="bi bi-star-fill" style={{ color: '#53B96A' }} ></i>
                                                        <i className="bi bi-star-fill" style={{ color: '#53B96A' }} ></i>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className="form-group row p-1 text-end">
                                            <div className="col-6 col-md-6 col-sm-6">
                                                {
                                                    bateria >= 4.2 ?
                                                    <i className="bi bi-battery-full" style={{color:'#73777B', fontSize:20}}></i>
                                                    :
                                                    bateria >= 3.9 ?
                                                    <i className="bi bi-battery-three-quarters" style={{color:'#73777B', fontSize:20}}></i>
                                                    :
                                                    bateria >= 3.7 ?
                                                    <i className="bi bi-battery-half" style={{color:'#73777B', fontSize:20}}></i>
                                                    :
                                                    bateria >= 3.5 ?
                                                    <i className="bi bi-battery-quarter" style={{color:'#73777B', fontSize:20}}></i>
                                                    :
                                                    <i className="bi bi-battery-empty" style={{color:'#73777B', fontSize:20}}></i>
                                                }
                                            </div>
                                            <div className="col-6 col-md-6 col-sm-4 text-start">
                                                <span className='text-dark opacity-75' style={{fontSize:14}}>
                                                    {bateria >= 4.2 ? '100%' :
                                                    bateria >= 3.9 ? '75%' :
                                                    bateria >= 3.7 ? '50%' :
                                                    bateria >= 3.5 ? '25%' : '0%'}
                                                </span>
                                            </div>
                                        </div>



                                        <div className="form-group row text-end p-1">
                                            <div className="col-6 col-md-6 col-sm-6">
                                                <i className="bi bi-wifi" style={{color:'#73777B', fontSize:17}}></i>
                                            </div>
                                            <div className="col-6 col-md-6 col-sm-4 text-start">
                                                <p className='text-dark  opacity-75' style={{fontSize:14}}>{Math.floor(señal)}%</p>
                                            </div>
                                        </div>

                                        <div className="form-group row text-end p-1">
                                            <div className="col-6 col-md-6 col-sm-6">
                                                <span className='opacity-75' style={{fontSize:13}}>Tipo de balón:</span>
                                            </div>
                                            <div className="col-6 col-md-6 col-sm-4 text-start">
                                                    <select
                                                    id="typeSelect"
                                                    className="form-control form-control-sm w-100 opacity-75"
                                                    value={selectedValue}
                                                    onChange={handleSelectChange}
                                                    >
                                                    {/* <option value="">T</option> */}
                                                    <option value="tipo1" >Vertical 10k ▼</option>
                                                    <option value="tipo2" >Vertical 45k ▼</option>
                                                    </select>
                                            </div>
                                        </div>

                                        <div className="form-group text-end row p-1">
                                            <div className="col-6 col-md-6 col-xl-6">
                                                <span className='opacity-75' style={{fontSize:13}}>Minimo:</span>
                                            </div>
                                            <div className="col-6 col-md-6 col-xl-3">
                                                <input type="text" className='form-control form-control-sm w-100  opacity-75'  placeholder='70%' 
                                                value={valorMaximo}
                                                // onChange={setValorMaximo}
                                                    />
                                            </div>
                                        </div>

                                        <div className="form-group text-end row p-1">
                                            <div className="col-6 col-md-6 col-xl-6">
                                                <span className='opacity-75' style={{fontSize:13}}>Maximo:</span>
                                            </div>
                                            <div className="col-6 col-md-6 col-xl-3">
                                                <input type="text" className='form-control form-control-sm w-100  opacity-75'  placeholder='21%'
                                                value={valorMinimo}
                                                // onChange={(e) => setMinimo(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row p-1 d-flex justify-content-center align-items-center ">
                                            <div className="col-md-12 text-center">
                                                <button className="btn btn-xs btn-primary" style={{fontSize:12}} type="submit" onClick={PonerAlerta}>Guardar</button>
                                            </div>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>

                            <div className="col-4 col-md-6 col-xl-3 pt-4 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                                <BalonDiagram
                                width={100}
                                height={142}
                                nivel={9}
                                volumen={10}
                                filled={5}
                                inRange={true}
                                />
                            </div>

                            <div className="col-12 col-md-12 col-xl-6" >
                                    <GraficoBarra/>
                            </div>
                    </div>

                    <div className="container overflow-hidden">
                        <div className="row gx-4 mt-4 mb-2 border border-1 rounded">
                            <div className="col-12 col-md-6 col-xl-3">
                                <span className='text-dark opacity-75' style={{fontSize:13}}>Cliente: </span>
                                <span className='text-dark opacity-75' style={{fontSize:13}}>LLAMA GAS</span>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <span className='text-dark opacity-75' style={{fontSize:13}}>Código: </span>
                                <span className='text-dark opacity-75' style={{fontSize:13}}>B0001</span>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3 ">
                                <span className='text-dark opacity-75' style={{fontSize:13}}>Locación: </span>
                                <span className='text-dark opacity-75' style={{fontSize:13}}>LIMA NORTE</span>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <span className='text-dark opacity-75' style={{fontSize:13}}>Imei: </span>
                                <span className='text-dark opacity-75' style={{fontSize:13}}>49:21:07:26:b3:12</span>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </Tarjeta>

        {/* <Tarjeta title='hola' toolbar={true} className='mt-4'> 
                <p>Hola seño</p>                                
        </Tarjeta> */}

        </div>
        
    );


};