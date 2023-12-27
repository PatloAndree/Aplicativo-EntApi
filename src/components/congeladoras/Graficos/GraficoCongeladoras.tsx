import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2'; // Importa el componente de gráfico de torta
import 'chart.js/auto';
import { UserAPIType } from '../../../api/auth-api';
import { getLocal } from '../../../services/local-storage';
import { API2 } from '../../../api/api2';
import axios from 'axios';

export interface ResponseData {
  status: boolean;
  msg: string;
  data: {
    activos: number;
    inactivos: number;
    alarmas: number;
  };
}

export const Incial: ResponseData = {
  status: true,
  msg: 'Consulta exitosa',
  data: {
    activos: 2,
    inactivos: 0,
    alarmas: 0
  }
};

export interface Repuesta {
  activos: number;
  inactivos: number;
  alertas: number;
}

interface Props {
  datos: Repuesta;
}

function GraficoCongeladoras() {
  
 const [grafico, setGrafico] = useState<Repuesta[]>([]);
 const [activos, setActivos] = useState<number>(0); 
 const [alarmas, setAlarmas] = useState<number>(0); 
 const [inactivos, setInactivos] = useState<number>(0);


 const [pieData, setPieData] = useState({
  datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(25, 135, 84, 1)',
          'rgba(255, 193, 7, 0.94)',
          'rgba(26, 26, 26, 0.31)',
        ],
      },
    ],
  });

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

      setPieData({
        datasets: [
          {
            data: [graficoArray[0].activos,graficoArray[0].inactivos,graficoArray[0].alertas],
            // data: [0,0,0],
            backgroundColor: [
              'rgba(25, 135, 84, 1)',
              'rgba(255, 193, 7, 0.94)',
              'rgba(26, 26, 26, 0.31)',
            ],
          },
        ],
      });

      console.log(graficoArray);
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };

  const datosEjemplo = [
    { hora: 'Activos', porcentaje: 2, calidad: 2 },
    { hora: 'Alertas', porcentaje: 0, calidad: 5 },
    { hora: 'Inactivas', porcentaje: 0, calidad: 4 },
    // { hora: 'Alertas', porcentaje: 10, calidad: 7 },
  ];

  const [datos, setDatos] = useState(datosEjemplo); 
  
  useEffect(() => {
    postData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: true,
        
        labels: {
          usePointStyle: true, 
          boxWidth: 10, 
        },
      },
    },
  };

  const ref = useRef();

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center col-12 col-md-12 wrap" >
        
        <div className="d-flex justify-content-center col-12 col-md-4 col-xl-6">
            <Pie ref={ref} data={pieData} options={options} />
        </div>

        <div className="d-flex justify-content-center align-items-center col-12 col-md-6 col-xl-6 ">


             <div className="div1 d-flex flex-column align-items-center col-6 col-md-6 col-xl-8 " > 
                <div> 
                    <i className="bi bi-circle-fill " style={{fontSize:15, color:'rgba(25, 135, 84,1)'}}> </i> 
                    Activos 
                </div>
                <div>
                    <i className="bi bi-circle-fill " style={{fontSize:15, color:'rgba(255, 193, 7, 0.94)' }}> </i> 
                    Alertas
                </div>
                <div>
                    <i className="bi bi-circle-fill " style={{fontSize:15, color:'rgba(26, 26, 26, 0.31)' }}> </i> 
                    Inactivas
                </div>
                {/* <div className='text-center'>
                    Total
                </div> */}
            </div>

            <div className="d-flex flex-column align-items-center div2 col-6 col-md-6 col-xl-2 " >
                <p>{activos}</p>
                <p>{alarmas}</p>
                <p>{inactivos}</p>
                <p>
                </p>
                {/* <p>9</p> */}
            </div>



        </div>
  </div>
  );
}

export default GraficoCongeladoras;

// <div className="d-flex flex-wrap justify-content-center col-12 wrap" style={{ width: 450, height: 200 }}>
// <div className="d-flex justify-content-start" style={{ width: 200, height: 180 }}>
//     <Pie ref={ref} data={pieData} options={options} />
// </div>

// <div className="d-flex">
//     <div className="div1" style={{ width: 120, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
//         <p>Ok </p>
//         <p>Alertas</p>
//         <p>Desconectados</p>
//     </div>

//     <div className="div2" style={{ width: 120, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
//         <p>5</p>
//         <p>3</p>
//         <p>1</p>
//     </div>

// </div>

// </div>