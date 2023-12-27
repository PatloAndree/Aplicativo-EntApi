import React from 'react';
import { useAppStore } from "../../../store/store";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import CardResumeDetails from "../../common/resumen/CardResumeDetails";
import CardWidget from "../../common/card-widget/CardWidget";
import Gas from "../../../assets/gas.png";
import BatteryIndicator from '../../reservorios/nivel-reservorios/BatteryIndicator';
import ReservorioDiagram from '../../reservorios/reservorio-diagram/ReservorioDiagram';

export default function NivelGas() {

    return (
        <CardWidget title="Nivel de gas" >
        <div className="">
            <div className="">
                <div className="text-center text-secondary">
                <span>nivel 1</span>
                </div>
                <div className="d-flex mt-3">
             
                <div className="ms-auto ps-3">
                    <ReservorioDiagram
                    width={110}
                    height={140}
                    nivel={10}
                    volumen={12}
                    filled={11}
                    dato={14}
                    inRange={true}
                    isOutOfRange={false}
                    />
                </div>
                </div>
            </div>
          
     
        </div>
        </CardWidget>


    );
}



