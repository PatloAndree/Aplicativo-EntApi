import React from "react";
import AreasContainer from "../components/config/areas/AreasContainer";
import DispositivosContainer from "../components/config/dispositivos/DispositivosContainer";
import MailConfigContainer from "../components/config/mails/MailConfigContainer";

export default function Configuracion() {
  return (
    <div className="container-fluid py-4 px-lg-5">
      <div>
        {/* <MailConfigContainer /> */}
      </div>
      <div className="pt-4">
        <DispositivosContainer />
      </div>
      <div className="pt-4">
        <AreasContainer />
      </div>
    </div>
  );
}
