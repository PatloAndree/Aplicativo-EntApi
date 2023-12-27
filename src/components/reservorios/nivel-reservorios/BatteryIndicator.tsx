import React from "react";
import {
  FaBatteryEmpty as Bat0,
  FaBatteryQuarter as Bat1,
  FaBatteryHalf as Bat2,
  FaBatteryThreeQuarters as Bat3,
  FaBatteryFull as Bat4,
} from "react-icons/fa";

interface Props {
  className?: string;
  battery: number;
}
export default function BatteryIndicator(props: Props) {
  if (props.battery <= 10) {
    return <Bat0 className={`${props.className || "fs-6"}`} />;
  }
  if (props.battery <= 35) {
    return <Bat1 className={`${props.className || "fs-6"}`}></Bat1>;
  }
  if (props.battery <= 60) {
    return <Bat2 className={`${props.className || "fs-6"}`}></Bat2>;
  }
  if (props.battery <= 85) {
    return <Bat3 className={`${props.className || "fs-6"}`}></Bat3>;
  }
  return <Bat4 className={`${props.className || "fs-6"}`}></Bat4>;
}

