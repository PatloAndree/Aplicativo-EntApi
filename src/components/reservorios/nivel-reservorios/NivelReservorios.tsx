import React, { useState } from "react";
import CardWidget from "../../common/card-widget/CardWidget";
import SignalIndicator from "./SignalIndicator";
import ReservorioDiagram from "../reservorio-diagram/ReservorioDiagram";
import BatteryIndicator from "./BatteryIndicator";
import { ReservorioLevelType } from "../../../api/reservorios-api";
import { AiFillThunderbolt } from 'react-icons/ai';

import { log } from "console";
import { useCallback } from "react";
import {
  ReservorioUpdateMaxMinType,
  updateReservorioMaxMinAPI,
} from "../../../api/reservorios-api";
import { useDispositivosAPI } from "../../../api-state/useDispositivosAPI";
import { useAppStore } from "../../../store/store";

interface Props {
  reservorios: ReservorioLevelType[];
  
  
}

export default function NivelReservorios(props: Props) {
  const [showAlerts, setShowAlerts] = useState<boolean[]>(Array(props.reservorios.length).fill(false));
  const [userInputs, setUserInputs] = useState<string[]>(Array(props.reservorios.length).fill(""));
  const [showAcceptedAlerts, setShowAcceptedAlerts] = useState<boolean[]>(Array(props.reservorios.length).fill(false));

  const id = useAppStore((state) => state.user?.id);
  const { dispositivoLista, error, isLoading, mutate } = useDispositivosAPI(
    `${id}`
  );

  
  const [editState, setEditState] = useState({
    error: false,
    success: false,
    loading: false,
  });
   const onEdit = useCallback(
    async (index: number) => {
      setEditState({ error: false, success: false, loading: true });
      const reservorio = props.reservorios[index];
      const reservorioUpdate = {
        imei: reservorio.nombre,
        max:(reservorio.valorreferencia+1).toString(),
        min:(reservorio.valorminimo+1).toString(),
        tipo:2
      };

      try {
        updateReservorioMaxMinAPI(reservorioUpdate);

        mutate();
        setEditState({ ...editState, success: true, loading: false });
      } catch (e) {
        setEditState({ ...editState, error: true, loading: false });
        mutate();
      }
    },
    [mutate, editState]
  ); 
  const handleGuardarClick = (index: number) => {
    const minInputValue = parseFloat(userInputs[index * 2]); // Convierte a número
    const maxInputValue = parseFloat(userInputs[index * 2 + 1]); // Convierte a número
  
    // Verifica si ambos valores son números válidos antes de guardarlos
    if (!isNaN(minInputValue) && !isNaN(maxInputValue)) {
      // Construye una clave única para cada reservorio
      const minKey = `min_${index}`;
      const maxKey = `max_${index}`;
  
      // Guarda los valores en el almacenamiento local
      localStorage.setItem(minKey, minInputValue.toString()); // Convierte nuevamente a cadena
      localStorage.setItem(maxKey, maxInputValue.toString()); // Convierte nuevamente a cadena
      const minValue = localStorage.getItem(minKey);
      const maxValue = localStorage.getItem(maxKey);

      // Comprobar si los valores existen y no son nulos
      if (minValue !== null && maxValue !== null) {
        // Los valores existen en el almacenamiento local, puedes mostrarlos en tu interfaz de usuario
        console.log(`Valor mínimo para el reservorio ${index}: ${minValue}`);
        console.log(`Valor máximo para el reservorio ${index}: ${maxValue}`);
      } else {
        // Los valores no existen en el almacenamiento local o son nulos
        console.log(`No se encontraron valores para el reservorio ${index}`);
      }
          }
        };
  

  

  const handleInputChange = (index: number, newValue: string) => {
    const newUserInputs = [...userInputs];
    newUserInputs[index] = newValue;
    setUserInputs(newUserInputs);
  };

  const inputStyle = {
    width: '70px', 
    height:'30px',     
    border: '1px solid #ccc', 
    padding: '5px',          
    borderRadius: '4px'      ,
    color:"gray"
  };
  const labelStyle = {
    marginRight: '-20px',
    width: '100px'  // Espacio entre el label y el input
  };
 
  const inputContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto', // Dos columnas para el label y el input
    alignItems: 'center', // Alinea verticalmente los elementos en el centro
    marginBottom: '20px',
    color:"gray",
  };
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
   
    e.target.style.borderWidth = '4px'; // Aumenta el ancho del borde
  };
  
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = 'initial'; // Restaura el color del borde a su valor inicial
    e.target.style.borderWidth = '1px'; // Restaura el ancho del borde a su valor inicial
  };
  
  
  return (
    <CardWidget title="Nivel de reservorios" toolbar={true}>
      <div className="d-flex justify-content-around gap-5 flex-wrap m-4 mb-5">
        {props.reservorios.map((res, index) => {
          const filled = res.l / res.valorreferencia;
          const inRange = res.l < res.valorreferencia && res.l > res.valorminimo;
          const isLowBat = res.bateria < 10;
          const valorMinimo = 14;
          const valorMaximo = 17;
          const valorActual = res.v;
          const porcentaje = ((valorActual - valorMinimo) / (valorMaximo - valorMinimo)) * 100;
          const porcentajeFormateado = `${porcentaje.toFixed(2)}%`;
          return (
            <div key={res.codigo} className="position-relative">
              <div className="text-center text-secondary">
                <span>Reservorio 0{index + 1}</span>
              </div>
              <div className="d-flex mt-3">
                <div className="d-flex flex-column gap-3">
                  <div className="text-secondary">
                    <SignalIndicator signal={res.s} className="fs-5" />{res.s}
                    <div className={`d-flex gap-1 align-items-center ${isLowBat && "text-danger"}`}>
                      <BatteryIndicator battery={res.bateria} className="fs-4 me-1" />
                      <span style={{ fontSize: "15px" }}>{porcentajeFormateado} </span>
                    </div>
                    
                    
                    <div className={`d-flex gap-1 align-items-center ${isLowBat && "text-danger"}`}>

                    </div><br />
                    <label style={{ color: 'black' }}>Altura Cm</label>
                  
                  </div>
                  <div>
                  <div style={inputContainerStyle}>
  <label htmlFor={`min-${index}`} style={labelStyle}>Minima :</label>
  <input 
    type="number"
    id={`min-${index}`}
    name={`min-${index}`}
    min="0"
    style={{ ...inputStyle, width: '60px' }} // Establece un ancho fijo
    onFocus={(e) => {
      
      e.target.style.boxShadow = '2px 2px 5px rgba(128, 0, 128, 0.5)';
    }}
    onBlur={(e) => {
      
      e.target.style.boxShadow = '';
    }}
    onChange={(e) => handleInputChange(index, e.target.value)} defaultValue={res.valorminimo}
  />
</div>
<div style={inputContainerStyle}>
  <label htmlFor={`max-${index}`} style={labelStyle}>Maxima :</label>
  <input
    type="number"
    id={`max-${index}`}
    name={`max-${index}`}
    min="0"
    style={{ ...inputStyle, width: '60px' }} // Establece un ancho fijo
    onFocus={(e) => {
      
      e.target.style.boxShadow = '2px 2px 5px rgba(128, 0, 128, 0.5)';
    }}
    onBlur={(e) => {
      
      e.target.style.boxShadow = '';
    }}
    onChange={(e) => handleInputChange(index, e.target.value)}defaultValue={res.valorreferencia}
  />
</div>


                    {/* <input
                      type="number"
                      value={userInputs[index]}
                      min={0} 
                      onKeyPress={(e) => { 
                        const charCode = e.which ? e.which : e.keyCode; 
                        if (charCode === 45 || charCode === 43) { 
                          e.preventDefault(); 
                        } 
                      }} 
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      style={{
                        width: "60px",
                        height: "25px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "5px",
                      }}
                    />
                    m */}
                    <button
  className="alert alert-primary mt-3"
  style={{
    backgroundColor: '#00008b', // Fondo azul
    color: 'white', // Texto en blanco
    fontSize: '16px',
    width: '90px',
    textAlign: 'center', // Alinea el texto al centro horizontalmente
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // Centra verticalmente el contenido
    bottom: '0',
    height: '40px',
    lineHeight: '40px', // Establece la altura de línea igual a la altura del botón
  }}
  onClick={() => handleGuardarClick(index)}
>
  Guardar
</button>

                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="text-secondary">
                      <div className="d-flex">
                        <div className="barra" style={{ width: "50%", height: "5px", backgroundColor: "lightgray" }}></div>
                        <div className="barra" style={{ width: "50%", height: "5px", backgroundColor: "lightgray" }}></div>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
                
                <div className="ms-auto ps-3">
                  <ReservorioDiagram width={140} height={140} nivel={res.l} volumen={res.v} filled={filled} dato={15} inRange={inRange} isOutOfRange={res.l < res.valorminimo || res.l > res.valorreferencia}/>
                </div>
              </div>
              
              {/* {showAlerts[index] && (
                <div className="alert alert-danger mt-3 position-absolute" style={{ fontSize: "small", width: "150px", bottom: "0", }}>
                  {parseFloat(userInputs[index]) > res.valorreferencia && (
                    <div>El valor no debe superar el máximo de {res.valorreferencia} m.</div>
                  )}
                  {parseFloat(userInputs[index]) < res.valorminimo && (
                    <div>El valor no debe ser inferior al mínimo de {res.valorminimo} m.</div>
                  )}
                </div>
              )}
              {showAcceptedAlerts[index] && (
                <div className="alert alert-success mt-3 position-absolute" style={{ fontSize: "small", width: "150px", bottom: "0" }}>
                  Aceptado
                </div>
              )} */}
             {/*  <button
                    className="btn btn-success btn-sm rounded-circle"
                    onClick={() => handleUpdateMaxMinClick(index)}
                    style={{ marginTop: "-20px", width: "120px", height: "50px" }}
                  >
                    Actualizar 
                  </button> */}
              

            </div>
          );
        })}
        
      </div>
                  

    </CardWidget>
  );
}
