import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import refrigerador from '../../assets/refri1.png';
import refri from '../../../assets/congelador.png';
import refri2 from '../../../assets/congeladora.png';
import { Button, Modal, Box, Typography,IconButton} from '@mui/material';
import CardWidget from '../../common/card-widget/CardWidget';
import { API2 } from '../../../api/api2';
import { getLocal } from '../../../services/local-storage';
import { UserAPIType } from '../../../api/auth-api';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '1000px',
};

const center = {
  lat: -12.0464, // Latitud del centro del mapa (Lima)
  lng: -77.0428, // Longitud del centro del mapa (Lima)
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 12,
  p: 3,
};



interface Data {
  codigo: number;
  nombre_locacion: string;
  sensor_id: string;
  bateria: string;
  movimiento: number;
  longitud: string;
  latitud: string;
  status: string;
}

interface MarkerData {
  id: number;
  name: string;
  sensor:string,
  bateria:string,
  movimiento:number,
  lat: number;
  lng: number;
  status:string
;}

function Map() {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMapLoaded, setMapLoaded] = useState(false); 
  const [isInfoOpen, setInfoOpen] = useState(false);


  const API_URL = `${API2}/listaDispositivoMovimientoEstados/`;

  const [responseData, setResponseData] = useState<{
    status: boolean;
    message: string;
    totalRegistros: number;
    data: Data[];
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

    const postData = async () => {
      try {
        const apiUrl = API_URL; // Reemplaza con la URL de tu endpoint
        const requestBody = {
          empresa: '9',
          tipo: 'congeladora',
        };

        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json', // Indicamos que el contenido es JSON
          },
        });

        setResponseData(response.data);
      } catch (error) {
        console.error('Error al enviar la solicitud POST:', error);
      }
    };

    const closeModal = () => {
      setSelectedMarker(null);
      setModalOpen(false);
    };

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyBpMVeBuJ3IjS-SS4hj6FCgEsCV3S20Bdw', 
    });
    
 
  const markersFromResponse: MarkerData[] = responseData
    ? responseData.data.map((item) => ({
        id: item.codigo,
        name: item.nombre_locacion,
        lat: parseFloat(item.latitud), // Asegúrate de convertir a número
        lng: parseFloat(item.longitud), // Asegúrate de convertir a número
        sensor:item.sensor_id,
        bateria:item.bateria,
        movimiento:item.movimiento,
        status:item.status
      }))
    : [];

    const openModal = (marker: MarkerData) => {
      setSelectedMarker(marker);
      setModalOpen(true);
    };

    const openInfo3 = () => {
      setInfoOpen(true);
    };

    const closeInfo = () => {
      setInfoOpen(false);
    };

    const openInfo = (marker: MarkerData) => {
      if (!isInfoOpen) {
        setInfoOpen(true);
        setSelectedMarker(marker);
      }
    };

  useEffect(() => {
    postData();
  }, []);

  return (
    <div>
      <div>
        
      </div>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Utiliza el arreglo de marcadores de responseData */}
        {markersFromResponse.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: refri,
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onMouseOver={() => openInfo(marker)} 
            // onClick={() => openModal(marker)} 
            // onMouseOut={() => closeInfo()} 
          />
          
        ))}

        { isInfoOpen && selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={closeInfo}
          >
            <div>
              <Typography variant="subtitle1">Detalles del congelador {selectedMarker.id}</Typography>
              <Typography variant="subtitle2">Código: {selectedMarker.id}</Typography>
              <Typography variant="subtitle2">Locación: {selectedMarker.name}</Typography>
              <Typography variant="subtitle2">Latitud: {selectedMarker.lat}</Typography>
              <Typography variant="subtitle2">Longitud: {selectedMarker.lng}</Typography>
              <Typography variant="subtitle2">Sensor: {selectedMarker.sensor}</Typography>
              <Typography variant="subtitle2">Bateria: {selectedMarker.bateria}</Typography>
              <Typography variant="subtitle2">Movimiento: {selectedMarker.movimiento}</Typography>
              <Typography variant="subtitle2">Status: {selectedMarker.status}</Typography>
              {/* Agrega más detalles  */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      )}
    </div>
  );
}

export default Map;


// AIzaSyBpMVeBuJ3IjS-SS4hj6FCgEsCV3S20Bdw