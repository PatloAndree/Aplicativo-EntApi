import React from "react";
import AreasContainer from "../components/config/areas/AreasContainer";
import NewAreaContainer from "../components/new-area/NewAreaContainer";

export default function Areas() {
  return (
    <div
      className="container-fluid py-4 px-lg-5"
      //style={{ maxWidth: "min-content" }}
    >
      <div className="row gy-4 justify-content-center">
        <div className="col-12 col-lg-10 col-xxl-4">
          <NewAreaContainer />
        </div>
        <div className="col-12 col-xxl-8">
          <AreasContainer />
        </div>
      </div>
    </div>
  );
}
