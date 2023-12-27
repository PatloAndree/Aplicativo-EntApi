import React from "react";
import { GoDash } from "react-icons/go";

export interface SeriesLegend {
  label: string;
  color: string;
  id: number;
}

interface Props {
  title?: string;
  seriesLegend: SeriesLegend[];
  toggleSeries?: (id: number) => void;
}

export default function Leyenda(props: Props) {
  return props.seriesLegend.length > 0 ? (
    <div style={{ fontSize: "small" }}>
      <div className="d-flex flex-wrap">
        {props.title && (
          <div className="pe-2 text-dark text-opacity-75 pt-2">
            {props.title}
          </div>
        )}
        {props.seriesLegend.map((serie) => (
          <div
            className="px-1"
            key={serie.id}
            style={{ color: serie.color }}
            role="button"
            onClick={() =>
              props.toggleSeries ? props.toggleSeries(serie.id) : null
            }
          >
            <i className="fs-5 fw-bolder">
              <GoDash />
            </i>
            <span>{serie.label}</span>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
