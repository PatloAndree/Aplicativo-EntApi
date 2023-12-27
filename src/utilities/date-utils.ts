import { timeFormat } from "d3-time-format";

export function moverFecha(d: Date, days: number) {
  let r = new Date(d);
  const dateUpdated = r.getDate() + days;
  r.setDate(dateUpdated);
  return r;
}

export function moverHours(d: Date, hours: number) {
  const result = d.getTime() + hours * 3600 * 1000;
  return new Date(result);
}

type RangeType = [Date, Date];
export function extendRange(r: RangeType): RangeType {
  const startDate = `${timeFormat("%Y-%m-%d")(r[0])} 00:00:00`;
  const endDate = `${timeFormat("%Y-%m-%d")(r[1])} 23:59:59`;
  return [new Date(startDate), new Date(endDate)];
}
