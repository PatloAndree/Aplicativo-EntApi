import React, { ReactNode, useState } from "react";
import BtnIcon from "../btn-icon/BtnIcon";
import { GoDash as Dash, GoPlus as Plus, GoSync } from "react-icons/go";
import "./tarjeta.scss";

interface Props {
  title?: string;
  toolbar?: ReactNode;
  refresh?: ReactNode;
  children: ReactNode;
  className?: string;
}
export default function Tarjeta(props: Props) {
  const { title, toolbar,refresh ,children, className, ...restProps } = props;

  const [minimized, setMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [reloadKey, setReloadKey] = useState<number>(0);

  const recargar = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); 
      console.log("refrescando");
    }, 500);
 };


  return (
    <div
      className={`${className || "bg-gray"}  card border-0 shadow`}
      {...restProps}
    >
      {toolbar && (
        <div className="d-flex align-items-center ps-3 pe-2 py-1 rounded-top bg-primary text-white">
            <span className="" style={{ fontSize: "0.9rem" }}>
              {title}
            </span>
            <div className="ms-auto d-flex gap-2 align-items-center">
                <span className="px-1 d-flex gap-1 align-items-center ">
                  {refresh}
                  <BtnIcon
                    onClick={ () => recargar()}
                    className="text-white"
                  >
                    {/* {minimized ? <Plus /> : <Dash/>} */}
                    <GoSync />
                  </BtnIcon>
                </span>

                <span className="ms-auto d-flex gap-2 align-items-center ">
                  {toolbar}
                  <BtnIcon
                    onClick={() => setMinimized(!minimized)}
                    className="text-white"
                  >
                    {minimized ? <Plus /> : <Dash/>}
                    {/* <GoSync /> */}
                  </BtnIcon>
                </span>
            </div>
        </div>
      )}
      {/* <div className={minimized ? 'd-none': 'd-block'}>
        {children}
      </div> */}
      {!minimized && !isLoading  &&  (
        <div className="animate__animated animate__fadeIn">{children}</div>
      )}
     
    </div>
  );
}
