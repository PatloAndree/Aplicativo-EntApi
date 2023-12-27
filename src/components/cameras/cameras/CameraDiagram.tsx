import React, { CSSProperties, useMemo } from "react";
import { DispositivoAPIType } from "../../../api/dispositivos-api";
//import CameraBackground from "../../../assets/camera.svg";
import { ReactComponent as BtnGreen } from "../../../assets/btn-green.svg";
import { ReactComponent as BtnRed } from "../../../assets/btn-red.svg";

interface Props {
  width: number;
  deviceList: DispositivoAPIType[];
}

export default function CameraDiagram(props: Props) {
  const devByRow = useMemo(() => {
    if (props.width < 320) return 2;
    if (props.width > 400 && props.deviceList.length > 6) return 4;
    return 3;
  }, [props]);
  const rows = useMemo(
    () => Math.ceil(props.deviceList.length / devByRow),
    [props.deviceList, devByRow]
  );
  const width_step = props.width / (devByRow + 1);
  const height_step = rows % 2 === 0 ? 110 : 120;

  const fsBox = width_step > 100 ? "small" : "x-small";
  const radius = width_step > 100 ? 14 : 11;
  const height = height_step * (rows + 1);

  return (
    <div
      style={{
        backgroundColor: "var(--bs-gray-300)",
        width: props.width,
        height: height,
        position: "relative",
      }}
      className="border border-secondary border-2"
    >
      <svg x={0} y={0} width={props.width} height={height}>
        {Array(rows)
          .fill(0)
          .map((e, i) => (
            <line
              key={i}
              x1={2}
              x2={props.width - 2}
              y1={(i + 1) * height_step}
              y2={(i + 1) * height_step}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth={1.5}
              strokeDasharray="5 5"
            />
          ))}
      </svg>
      {props.deviceList.map((dev, i) => {
        const x = ((i % devByRow) + 1) * width_step;
        const y = (Math.floor(i / devByRow) + 1) * height_step;
        const boxStyle = y > height / 2 ? { top: y } : { top: y - height_step };
        const boxClass =
          y > height / 2 ? "justify-content-start" : "justify-content-end";
        const btnStyle: CSSProperties = {
          position: "absolute",
          top: y - radius,
          left: x - radius,
          width: 2 * radius,
          height: 2 * radius,
        };

        const textStyle =
          y > height / 2
            ? {
                top: y - 1.8 * radius,
                transform: "translate(-50%, -100%)",
              }
            : { top: y + 1.2 * radius, transform: "translate(-50%)" };

        return (
          <div key={dev.dis_id}>
            {dev.temp > +dev.dis_maxt ||
            dev.temp < +dev.dis_mint ||
            dev.hum > +dev.dis_maxh ||
            dev.hum < +dev.dis_minh ? (
              <BtnRed style={btnStyle} />
            ) : (
              <BtnGreen style={btnStyle} />
            )}
            <div
              className={`d-flex flex-column align-items-end ${boxClass}`}
              style={{
                position: "absolute",
                left: x - width_step + radius,
                height: height_step,
                width: width_step,
                fontSize: fsBox,
                lineHeight: 1.1,
                paddingTop: radius * 1.5,
                paddingBottom: radius * 1.5,
                ...boxStyle,
              }}
            >
              <div className="d-flex align-items-center">
                <span>{dev.temp.toFixed(1)} °C</span>
                <i className="ms-1 fs-6 bi bi-thermometer-half text-secondary"></i>
              </div>
              <div className="d-flex align-items-center">
                <span>{dev.hum.toFixed(1)} %</span>
                <i className="ms-1 fs-6 bi bi-droplet-half text-secondary"></i>
              </div>
              <div className="d-flex align-items-center">
                <span>{dev.bat.toFixed(1)} %</span>
                <i className="ms-1 fs-6 bi bi-battery-half text-secondary"></i>
              </div>
            </div>
           
            <span
              style={{
                position: "absolute",
                fontSize: "x-small",
                // marginTop:20,
                color: "var(--bs-secondary)",
                left: x,
                ...textStyle,
              }}
            >
              {dev.dis_nom }
            </span>
            <span
              style={{
                position: "absolute",
                fontSize: "x-small",
                marginTop:12,
                color: "var(--bs-secondary)",
                left: x,
                ...textStyle,
              }}
            >
              {dev.dis_sensor_id }
            </span>

          </div>
        );
      })}
    </div>
  );
}
