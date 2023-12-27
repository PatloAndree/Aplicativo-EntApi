import {
  Axis,
  Grid,
  LineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";


import { curveMonotoneX, timeFormat ,timeHour } from "d3";
import { getLocal } from "../../../services/local-storage";
import { UserAPIType } from "../../../api/auth-api";


export interface AccessorsType<DatumT> {
  xAccessor: (d: DatumT) => Date;
  yAccessor: (d: DatumT) => number;

}

export interface SeriesVisType<DatumT> {
  id: number;
  trama: DatumT[];
  label: string;
  showSeries: boolean;
  color: string;
}

interface Props<DatumT> {
  timeDomain: [Date, Date];
  seriesVis: SeriesVisType<DatumT>[];
  accessors: AccessorsType<DatumT>;
  unidad: string;
  width: number;
  height: number;
}

const axisColor = "rgb(85, 82, 85)";
const gridColor = "rgba(105, 102, 105, 0.3)";

export function GraficaTemporal<Datum extends {}>(props: Props<Datum>) {
  const user = getLocal<UserAPIType>("user");

  const fechaActual = new Date();
  const xScaleDomain = [props.timeDomain[0], new Date(fechaActual.getTime() + 1000 * 60 * 60 * 5)]; // Aumenta el dominio en  horas (ajusta según tus necesidades)
  const yScaleDomain = [0, 400];
  
  type YScaleProps =
    | { type: "linear"; zero: boolean; domain?: number[] }
    | { type: "time"; zero: boolean; domain?: Date[] };

  const yScaleProps: YScaleProps = {
    type: "linear",
    zero: false,
  };

  if (user?.id == 8) {
    yScaleProps.domain = yScaleDomain;
  }

  return (
    <XYChart
      resizeObserverPolyfill={ResizeObserver}
      height={props.height}
      margin={{
        top: 20,
        bottom: 30,
        right: 50,
        left: 50,
      }}
     
      xScale={{ type: "time", domain: xScaleDomain }}
      // yScale={{ type: "linear", domain:yScaleDomain, zero:false }}
      // yScale={{ type: "linear", zero:false }}
      yScale={yScaleProps}

    >
      <Axis
        orientation="bottom"
        stroke={axisColor}
        tickStroke={axisColor}
        tickLabelProps={() => ({
          fill: axisColor,
          verticalAnchor: "middle",
          fontSize: 11,
        })}
        tickFormat={(tickValue, index, ticks) => {
          const options = { month: 'long' };
          if (index === 0) {
            return tickValue.toLocaleDateString('es-ES', options);
          } else {
            const options2 = { weekday: 'short', day: 'numeric'};
            return tickValue.toLocaleDateString('es-ES', options2);
          }
        }}

      />
      <Axis
        orientation="left"
        stroke={axisColor}
        tickStroke={axisColor}
        numTicks={4}
        tickLabelProps={() => ({
          fill: axisColor,
          verticalAnchor: "end",
          fontSize: 11,
        })}
        hideZero={true}
        
      />
      <Axis
        orientation="right"
        stroke={axisColor}
        tickStroke={axisColor}
        numTicks={4}
        tickLabelProps={() => ({
          fill: axisColor,
          verticalAnchor: "end",
          fontSize: 11,
        })}
        hideZero={true}
       
      />
      <Grid rows={false} strokeDasharray={"3 7"} stroke={gridColor} />
      {props.seriesVis.map((serie) => {
        if (!serie.showSeries) return null;
        return (
          <LineSeries
            curve={curveMonotoneX}
            key={serie.id}
            dataKey={`d-${serie.id}`}
            data={serie.trama}
            stroke={serie.color} 
            {...props.accessors}
          />
        );
      })} 
      <Tooltip<Datum>
        renderTooltip={(tooltipData) => {
          const datumBySeries = tooltipData.tooltipData?.datumByKey;
          if (!datumBySeries) return null;
          return (
            <div className="p-2 fw-normal">
              {props.seriesVis.map((serie, j) => {
                const keyData = datumBySeries[`d-${serie.id}`];
                if (!keyData) return null;
                return (
                  <div key={`tt-${serie.id}`}>
                    <div className="mb-1" style={{ color: serie.color }}>
                      {`${serie.label} : ${props.accessors.yAccessor(
                        keyData.datum
                      )} ${props.unidad}`}    
                    </div>
                    {j === props.seriesVis.length - 1 ? (
                      <div>
                          <div>
                          {/* Mostrar la hora correspondiente al valor en el eje X */}
                          {/* {timeFormat("%d-%m-%y %H:%M:%S")(
                            props.accessors.xAccessor(keyData.datum)                         
                          )} */}
                        </div>
                      </div>
                    ) : null}
                  </div>                  
                );
              })}      
              {/* <p>
              {`${props.accessors.xAccessor(datumBySeries['d-1'].datum)}`}  
              </p>      */}
            </div>        
          );
        }}
        showHorizontalCrosshair={true}
        showVerticalCrosshair={true}
        verticalCrosshairStyle={{ strokeWidth: 1 }}
        horizontalCrosshairStyle={{ strokeWidth: 1 }}
        snapTooltipToDatumX={true}
        showSeriesGlyphs={true}
        renderGlyph={(glyph) => {
          const glyphColor = props.seriesVis.find(
            (serie) => `s-${serie.id}` === glyph.key
          )?.color;

          return glyphColor ? (
            <g>
              <circle
                cx={0}
                cy={0}
                r={4}
                fill="white"
                stroke={glyphColor}
                strokeWidth={2}
              ></circle>
            </g>
          ) : null;
        }}
      />
    </XYChart>
  );
}
