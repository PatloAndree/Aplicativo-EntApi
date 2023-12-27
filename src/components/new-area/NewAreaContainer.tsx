import React from "react";
import CardWidget from "../common/card-widget/CardWidget";
import NewArea from "./NewArea";

export default function NewAreaContainer() {
  return (
    <CardWidget title="Guardar área" toolbar={true}>
      <div className="p-4">
        <div className="m-auto" style={{ maxWidth: "32rem" }}>
          <NewArea onSave={(area) => console.log(area)} saveLoading={false} />
        </div>
      </div>
    </CardWidget>
  );
}
