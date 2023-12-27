import { ParentSize } from "@visx/responsive";
import React from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
import CameraDiagram from "./CameraDiagram";

interface Props {
  deviceList: DispositivoAPIType[];
}
export default function CameraDiagramRes(props: Props) {
  return (
    <ParentSize>
      {({ width }) => {
        return <CameraDiagram width={width} deviceList={props.deviceList} />;
      }}
    </ParentSize>
  );
}
