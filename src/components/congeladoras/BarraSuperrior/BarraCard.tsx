import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from "../../../store/store";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";
import CardWidget from '../../common/card-widget/CardWidget';
import GraficoCongeladoras ,{ ResponseData, Incial} from '../Graficos/GraficoCongeladoras';
import { API2 } from '../../../api/api2';
import { getLocal } from '../../../services/local-storage';
import axios from 'axios';

const responseData: ResponseData = Incial;

export interface Repuesta {
    activos: number;
    inactivos: number;
    alertas: number;
}

export default function BarraCard() {

    const [grafico, setGrafico] = useState<Repuesta[]>([]);
    const [activos, setActivos] = useState<number>(0); // 0 es el valor inicial
    const [alarmas, setAlarmas] = useState<number>(0); // 0 es el valor inicial
    const [inactivos, setInactivos] = useState<number>(0);

    const API_URL = `${API2}/ContadoresDispositivoMovimientoEstados/`;

    const postData = async () => {
    try {
        const apiUrl = API_URL;
        const requestBody = {
        empresa: '9',
        tipo: 'congeladora',
        };

        const response = await axios.post(apiUrl, requestBody, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
    
        const responseFromAPI = response.data.data; // Supongamos que responseFromAPI es un objeto
        const graficoArray = [responseFromAPI]; // Convierte el objeto en un array
        setGrafico(graficoArray);
        setActivos(graficoArray[0].activos);
        setAlarmas(graficoArray[0].alertas);
        setInactivos(graficoArray[0].inactivos);

        console.log(graficoArray);
    } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
    }
    };

    useEffect(() => {
    postData();
    }, []);

  return (
        <div className="row  pb-1 pt-1 justify-content-around ">

            <div className="col-12 col-md-6 col-xl-3">
                <GraficoCongeladoras/>
            </div>  
          
            <div className="d-flex justify-content-center col-6 col-md-6 col-xl-2 border-1 mt-2">
                <div className="d-flex justify-content-center align-items-center col-md-4">
                    <i className="bi bi-check-circle-fill text-success" style={{fontSize:36}}></i>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center col-md-4">
                    <div className="cantidad">
                       <h2>{activos}</h2>
                    </div>
                    <div className="tipo">
                        Activos
                    </div>

                </div>
            </div>

            <div className="d-flex justify-content-center col-6 col-md-6 col-xl-2 border-1 mt-2">
                <div className="d-flex justify-content-center align-items-center col-md-4">
                    <i className="bi bi-exclamation-circle-fill text-warning" style={{fontSize:36}}></i>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center col-md-4">
                    <div className="cantidad">
                       <h2>
                       {alarmas}
                       </h2>
                    </div>
                    <div className="tipo">
                        Alertas
                    </div>

                </div>
            </div>

            <div className="d-flex justify-content-center col-6 col-md-6 col-xl-2 border-1 mt-2">
                <div className="d-flex justify-content-center align-items-center col-md-4">
                    <i className="bi bi-wifi-off text-secondary" style={{fontSize:36}}></i>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center col-md-4">
                    <div className="cantidad">
                       <h2>00</h2>
                    </div>
                    <div className="tipo">
                        Opcional
                    </div>

                </div>
            </div>

            <div className="d-flex justify-content-center col-6 col-md-9 col-xl-2 border-1 mt-2">
                <div className="d-flex justify-content-center align-items-center col-md-4">
                    <i className="bi bi-x-circle-fill text-secondary" style={{fontSize:36}}></i>
                </div>  
                <div className="d-flex flex-column justify-content-center align-items-center col-md-4">
                    <div className="cantidad">
                       <h2>{inactivos}</h2>
                    </div>
                    <div className="tipo">
                        Inactivas
                    </div>

                </div>
            </div>
          
        </div>

  );
};

