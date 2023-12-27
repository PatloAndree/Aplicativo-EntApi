import React, { useState, useEffect } from "react";

import axios from 'axios';

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

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }



export default function AxiosApi() {

    // const [apiData, setApiData] = useState<ApiResponse | null>(null);
    // const [users, setUsers] = useState<User[]>([]);
  

    useEffect(() => {
      
      }, []);


return (
    <div>
            <p>buen dia</p>

           
     
    </div>
);
}