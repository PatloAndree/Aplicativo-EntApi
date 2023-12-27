/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BtnIcon from "../btn-icon/BtnIcon";
import { CSVLink } from "react-csv";
import InputSm from "../forms/InputSm";
import { Headers } from "react-csv/components/CommonPropTypes";
interface Props {
  onFilter: (f: string) => any;
  csvData: any[];
  headersCSV: Headers;
  onPrint: () => void;
}

export default function Toolbar(props: Props) {
  const [filter, setFilter] = useState("");
  useEffect(() => {
    props.onFilter(filter);
  }, [filter, props.onFilter]);

  const [showFilter, setShowFilter] = useState(false);
 

  return (
    <div className="d-flex justify-content-end align-items-center gap-3">
      <BtnIcon onClick={() => setShowFilter(true)}>
        <i className="bi bi-search fs-5 text-dark text-opacity-75" />
      </BtnIcon>

      {showFilter && (
        <div className="d-flex align-items-center animate__animated animate__pulse animate__faster">
          <InputSm
            type="text"
            style={{ width: "10rem" }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <BtnIcon className="ms-1" onClick={() => setShowFilter(false)}>
            <i className="bi bi-x fs-4 text-dark text-opacity-75" />
          </BtnIcon>
        </div>
      )}

      {/* <BtnIcon>
        <CSVLink
          data={props.csvData}
          separator=";"
          filename="entel-iot.csv"
          headers={props.headersCSV}
        >
          <i className="bi bi-cloud-arrow-down-fill text-dark text-opacity-75 fs-4" />
        </CSVLink>
      </BtnIcon> */}

      <BtnIcon>
        <CSVLink
          data={props.csvData}
          separator=";"
          filename="entel-iot.csv"
          headers={props.headersCSV}
        >
          <i className="bi bi-file-earmark-excel-fill text-dark text-opacity-75 fs-5" />
        </CSVLink>
      </BtnIcon>

      <BtnIcon onClick={props.onPrint}>
        <i className="bi bi-printer-fill text-dark text-opacity-75 fs-4" />
      </BtnIcon>
    </div>
  );
}
