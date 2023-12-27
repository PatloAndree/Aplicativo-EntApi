import React, { useState,useEffect, useRef} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {UserAPIType} from '../../../api/auth-api';
import { getLocal } from '../../../services/local-storage';
import { API2 } from '../../../api/api2';
import axios from 'axios';

  import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
  } from 'chart.js';

  ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
  );
  interface ApiResponse {
      status: number;
      msg: string;
      total: number;
      data: ApiDataItem[];
  }
    
  interface ApiDataItem {
  hora: string;
  porcentaje: number;
  calidad: number;
  }

const API_URL = `${API2}/consultardias/1`;

export default function GraficoBarra()  {

    const user = getLocal<UserAPIType>("user");
    const [datos, setDatos] = useState<ApiDataItem[]>([]);
    const today = new Date();
    // const startDate = '2023-08-29 08:20:36';
    // const endDate = '2023-08-25 20:29:36'; 

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // const startDate = new Date(today);
    // startDate.setHours(8, 0, 0, 0);
    // const formattedStartDate = formatDate(startDate);

    // // Configurar la hora para la fecha de fin (10 p.m.)
    // const endDate = new Date(today);
    // endDate.setHours(22, 0, 0, 0);
    // const formattedEndDate = formatDate(endDate);

    const formattedEndDate = formatDate(today);

    const startDate = new Date(today);
    startDate.setHours(startDate.getHours() - 24);
    const formattedStartDate = formatDate(startDate);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<ApiResponse>(
                    API_URL,
                    { 
                      fechaInicio: formattedStartDate,
                      fechaFin:  formattedEndDate
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                      },
                    }
                );
                setDatos(response.data.data);
            } catch (error) {
              console.error('Error al obtener datos de la API:', error);
            }
          };
      
          fetchData();
    }, []);

    const transformData = (data: ApiDataItem[]): { labels: string[], calidadData: number[] } => {
        
        const labels = data.map(item => {
            const dateTimeParts = item.hora.split(' ');
            const timeParts = dateTimeParts[1].split(':');
            const hour = timeParts[0];
            const minute = timeParts[1];
            // const second = timeParts[2];
            return `${hour}:${minute}`;

            // if (hour > '12') {
            //   return `${hour}:${minute} pm`;
            // }else{
            //   return `${hour}:${minute} am`;
            // }

        });

        const calidadData = data.map(item => item.porcentaje);
        labels.unshift(formattedStartDate.split(' ')[1].substr(0, 5));
        labels.push(formattedEndDate.split(' ')[1].substr(0, 5));

        return { labels, calidadData };
    };

    const { labels, calidadData } = transformData(datos);

    const data = {
            labels: labels,
            datasets: [
            {
                label: 'Capacidad por horas / 24 horas',
                data: calidadData,
                fill: false,
                borderColor: 'rgba(0, 79, 215, 0.99)',
                borderWidth: 0.6, 
                pointRadius: 0.5,
                tension: 0.7,
            },
            ]
    };
   
    const options = {
        scales: {
          x: {
            beginAtZero: false,
            grid: {
                display: true,
            },
            ticks: {
               maxTicksLimit: 4, // Cambiar este valor para ajustar la cantidad de etiquetas mostradas
            },
        },
          y: {
            grid: {
              display: false, // Deshabilita las líneas de cuadrícula en el eje Y
            },
            
          },
        },
    };

    const ref = useRef();

    return (
        <div className='d-flex justify-content-center flex-wrap mt-3'>
             <Line ref={ref} data={data} options={options} />
        </div>
    );
};