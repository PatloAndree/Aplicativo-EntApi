import React from "react";
import CardWidget from "../common/card-widget/CardWidget";
import NewDispositivo from "./NewDispositivo";

export default function NewDispositivoContainer() {
  return (
    <CardWidget title="Guardar dispositivo" toolbar={true}>
      <div className="p-4">
        <div className="m-auto" style={{ maxWidth: "32rem" }}>
          <NewDispositivo
            onSave={(dispositivo) => console.log(dispositivo)}
            saveLoading={false}
          />
        </div>
      </div>
    </CardWidget>
  );
}
