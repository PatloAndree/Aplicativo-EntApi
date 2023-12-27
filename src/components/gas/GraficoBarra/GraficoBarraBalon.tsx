import React, { useState,useEffect, useRef} from 'react';

import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

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
    Legend
  );
  

  export default function GraficoBarraBalon()  {

        const labels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        const [data, setData] = useState({
            labels: labels,
            datasets: [
            // label: 'Por hora',
            // data: [65, 59, 80, 81, 56, 55, 40],
            // backgroundColor: [
            //     'rgba(2, 93, 238, 0.8)'
            // ],
            // borderColor: [
            //     'rgba(2, 71, 181, 0.8)'
            // ],
            // borderWidth: 1
            {
                label: 'Balon 1',
                data: [7.40,6.29,5, 4, 4.30, 6, 7.20, 6.20],
                fill: false,
                // backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)'
              },
            //   {
            //     label: 'Balon 2',
            //     data: [33, 25, 35, 51, 54, 76],
            //     fill: false,
            //     borderColor: '#742774',
            //   },
            //   {
            //     label: 'Balon 3',
            //     data: [36, 20, 65, 54, 74, 26],
            //     fill: false,
            //     borderColor: 'rgba(2, 71, 181, 0.8)',
            //   },
            ]
        });
        const ref = useRef();

  return (
            <div>
            <h2>Gráfico de Barras</h2>
            <Line ref={ref} data={data} />
            

            </div>
  );
};

